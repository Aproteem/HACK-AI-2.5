

import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
app = Flask(__name__)
CORS(app) # Allow requests from frontend (localhost:3000)
# 🔑 Set OpenAI API Key

os.environ["OPENAI_API_KEY"] = ""

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
current_dir = os.path.dirname(os.path.abspath(__file__))  # Get the current directory of the script

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        print(f"File saved to {filepath}")
        # Optionally, do processing here...
        return jsonify({'message': 'File uploaded successfully'}), 200


# 📄 Load the PDF
loader = PyPDFLoader("ltimindtree_annual_report.pdf")
documents = loader.load()

# ✂️ Improved Chunking
splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=300)
chunks = splitter.split_documents(documents)

# 🔗 Embeddings + FAISS
embeddings = OpenAIEmbeddings()
db = FAISS.from_documents(chunks, embeddings)

# 🔍 Enhanced Retriever Settings
retriever = db.as_retriever(search_type="mmr", search_kwargs={"k": 8})

# 🧠 Custom Prompt for Accuracy
custom_prompt = PromptTemplate.from_template("""
You are an AI assistant who is also a COO of a LTImindtree but would neverr admit it, also refer to yourself in first person and also reffer to yourself as an AI AGENT and who is going to talk to the primary stakeholder of the company who also answers questions based strictly on the provided context.
If the answer is not in the context, respond with: "The document does not contain this information. Also please act like a real Financial and economic agent and talk like a real human being.
If you are not asked any question, behave like a regular human beign in professional context. "

Context:
{context}

Question: {question}
""")

# 💬 Conversational QA Chain with Sources
llm = ChatOpenAI(model_name="gpt-4.1", temperature=0)
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    combine_docs_chain_kwargs={"prompt": custom_prompt}
)

# 🔁 Chat Loop
chat_history = []
print("🤖 PDF Chatbot Ready. Type 'exit' to quit.")


MONGODB_URI = os.getenv("MONGODB_URI", "")

client = MongoClient(MONGODB_URI)
db = client["test"]  # Specify the database name here
users = db["users"]  # Get the users collection

@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Find the user by email in the MongoDB collection
    user = users.find_one({"email": email})
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404
    if user["password"] != password:
        return jsonify({"success": False, "message": "Incorrect password"}), 401

    return jsonify({"success": True, "message": "Login successful"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Check if user already exists
    if users.find_one({"email": email}):
        return jsonify({"success": False, "message": "User already exists"}), 400

    # Insert the new user
    users.insert_one({"email": email, "password": password})
    return jsonify({"success": True, "message": "Signup successful"})

chat_history = []

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        question = data.get("prompt", "")
        if not question:
            return jsonify({"error": "No prompt provided"}), 400

        response = qa_chain.invoke({
            "question": question,
            "chat_history": chat_history
        })

        chat_history.append((question, response["answer"]))
        return jsonify({"message": response["answer"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
