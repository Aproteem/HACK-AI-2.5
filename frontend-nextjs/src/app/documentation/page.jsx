"use client"
import { useRef } from "react";

const Documentation = () => {
  const sectionRefs = {
    introduction: useRef(null),
    installation: useRef(null),
    usage: useRef(null),
    features: useRef(null),
    faq: useRef(null),
  };

  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 bg-transparent text-white p-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-4">Documentation</h2>
        <nav className="space-y-4">
          {Object.keys(sectionRefs).map((key) => (
            <button
              key={key}
              onClick={() => scrollToSection(key)}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-100"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-12 text-white">
        {/* Introduction Section */}
        <section ref={sectionRefs.introduction} id="introduction">
          <h1 className="text-4xl font-bold mb-4">Introduction</h1>
          <p className="text-lg text-white opacity-70">
            LTIMindtree is a global digital solutions company that invited HackAI 2025 participants to build an application that answers natural language questions using content from a company's annual report. Our team took on this challenge by building an AI-powered app that extracts insights from uploaded reports and enables conversation with the data.
          </p>
          <hr className="my-8 border-gray-300" />
        </section>

        {/* Installation Section */}
        <section ref={sectionRefs.installation} id="installation">
          <h1 className="text-4xl font-bold mb-4">Installation</h1>
          <p className="text-lg  text-white opacity-70">
            To install and run FinSight locally:
          </p>
          <ol className="list-decimal ml-8 space-y-2  text-white opacity-70">
            <li>Clone the repository to your local machine.</li>
            <li>Set up Python and Node.js environments.</li>
            <li>Install dependencies using <code>pip install -r requirements.txt</code> and <code>npm install</code>.</li>
            <li>Configure your OpenAI and Unstructured.io API keys in a <code>.env</code> file.</li>
            <li>Run the backend Flask server and start the Next.js frontend.</li>
          </ol>
          <hr className="my-8 border-gray-300" />
        </section>

        {/* Usage Section */}
        <section ref={sectionRefs.usage} id="usage">
          <h1 className="text-4xl font-bold mb-4">Usage</h1>
          <p className="text-lg  text-white opacity-70">
            Upload a company’s annual report PDF through the interface. The app extracts text and visuals, then generates summaries and insights using AI. You can ask questions like “What are the key risks?” or “How did revenue grow year-over-year?” — and the chatbot will answer intelligently.
          </p>
          <p className="text-lg  text-white opacity-70">
            The dashboard visualizes financial metrics in real-time, updating as the AI parses more context. All insights are generated live based on user interaction.
          </p>
          <hr className="my-8 border-gray-300" />
        </section>

        {/* Features Section */}
        <section ref={sectionRefs.features} id="features">
          <h1 className="text-4xl font-bold mb-4">Features</h1>
          <ul className="list-disc ml-8 space-y-2  text-white opacity-70">
            <li>AI chatbot trained to understand company PDFs</li>
            <li>Real-time financial data extraction and summarization</li>
            <li>Interactive dashboards for metrics and trends</li>
            <li>Advanced visual data parsing (charts, tables, images)</li>
            <li>Prompt-tuned accuracy via LangChain and LlamaIndex</li>
            <li>Seamless PDF upload and analysis flow</li>
            <li>Fast, intuitive user interface built with Next.js</li>
            <li>Custom backend leveraging GPT-4 and Unstructured APIs</li>
          </ul>
          <hr className="my-8 border-gray-300" />
        </section>

        {/* FAQ Section */}
        <section ref={sectionRefs.faq} id="faq">
          <h1 className="text-4xl font-bold mb-4">FAQ</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">What is this app for?</h2>
              <p className=" text-white opacity-70">
                FinSight allows users to interact with company financial documents through a chatbot interface. It summarizes and visualizes insights from uploaded PDFs like annual reports.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">How do I get support?</h2>
              <p className=" text-white opacity-70">
                You can contact our team via GitHub issues, or email us at support@finsight.ai. Full documentation is available in the repository README.
              </p>
            </div>
          </div>
          <hr className="my-8 border-gray-300" />
        </section>
      </main>
    </div>
  );
};

export default Documentation;
