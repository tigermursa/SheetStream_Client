import { FaFileAlt, FaHistory, FaCheckCircle } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 py-10">
      <div className="max-w-4xl w-full bg-white md:shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-primary mb-6 md:mb-8">
          SheetStream v1.0.02
        </h2>
        <p className="text-base md:text-xl text-center text-secondary mb-4 md:mb-6">
          Input your document, and it’s live on our website!
        </p>

        <div className="space-y-8">
          {/* First Section */}
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-primary text-white p-3 md:p-4 rounded-full flex-shrink-0">
              <FaFileAlt className="text-2xl md:text-4xl" />
            </div>
            <p className="text-sm md:text-lg text-gray-800 leading-relaxed">
              <strong className="text-secondary">SheetStream</strong> is a blogging platform where bloggers can upload their blogs as DOCX files and edit them easily. It offers a smooth user experience while maintaining the integrity of your content.
            </p>
          </div>

          {/* Second Section */}
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-primary text-white p-3 md:p-4 rounded-full flex-shrink-0">
              <FaHistory className="text-2xl md:text-4xl" />
            </div>
            <p className="text-sm md:text-lg text-gray-800 leading-relaxed">
              <strong className="text-secondary">History of Creating this Website:</strong> This project started from a need in my office. We had a news section where admins wanted to post news like blogs. Initially, I tried processing PDF/DOCX files and displaying them directly. Due to limitations in doing this for free, I created SheetStream to convert DOCX files to HTML and edit them using a rich text editor like React Quill.
            </p>
          </div>

          {/* Third Section - Goals as point table */}
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-primary text-white p-3 md:p-4 rounded-full flex-shrink-0">
              <FaCheckCircle className="text-2xl md:text-4xl" />
            </div>
            <div>
              <p className="text-sm md:text-lg text-gray-800 font-semibold mb-2">Project Goals:</p>
              <ul className="list-disc list-inside text-sm md:text-lg text-gray-800 leading-relaxed">
                <li>Build an authentication system using Node.js</li>
                <li>Utilize Next.js with SSR, SSG, and CSR</li>
                <li>Create a fully responsive, production-level app</li>
                <li>Develop a robust backend and frontend</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
