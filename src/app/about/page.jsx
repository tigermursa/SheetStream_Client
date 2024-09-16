import { FaFileAlt, FaHistory, FaCheckCircle } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          SheetStream v1.0.02
        </h2>
        <p className="text-lg text-center text-secondary mb-4">
          Input your doc and it&lsquo;s live on our website!
        </p>

        <div className="space-y-6">
          <div className="flex items-start">
            <FaFileAlt className="text-primary text-3xl mr-4" />
            <p className="text-gray-700">
              SheetStream is essentially a blogging platform where bloggers can
              upload their blogs as DOCX files and edit them easily.
            </p>
          </div>
          <div className="flex items-start">
            <FaHistory className="text-primary text-3xl mr-4" />
            <p className="text-gray-700">
              <strong>History of Creating this Website:</strong> In my office
              project, we needed a news section where admins could post news
              like blogs. Initially, I tried allowing the backend to process
              PDF/DOCX files and display them directly. However, there were
              limitations in achieving this fully for free. So, I developed
              SheetStream to convert DOCX files to HTML and then update them
              using a React Quill text editor.
            </p>
          </div>
          <div className="flex items-start">
            <FaCheckCircle className="text-primary text-3xl mr-4" />
            <p className="text-gray-700">
              <strong>Project Goals:</strong> Build an authentication system
              using Node.js, utilize Next.js with SSR, SSG, and CSR, and create
              a fully responsive, production-level application with both
              frontend and backend implementations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
