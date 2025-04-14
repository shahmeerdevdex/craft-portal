
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const getResponseText = () => {
    switch (selectedOption) {
      case 'How do I upload job photos?':
        return 'To upload job photos, go to your active job, click on the job details, and use the "Upload Photos" button at the bottom of the page. You can upload multiple photos and add comments to each one.';
      case 'What jobs are assigned to me?':
        return 'You can see all your assigned jobs on the "My Jobs" page. The jobs are organized by status (in-progress, completed, etc).';
      case 'How do I get paid?':
        return 'Once your job is completed and approved, payment will be processed according to your payment terms. You can track payment status in the "Job History" section.';
      default:
        return null;
    }
  };

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-lg ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white border border-border rounded-lg shadow-xl flex flex-col max-h-[70vh] animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-blue-500 text-white rounded-t-lg">
            <h3 className="font-semibold">FixBot – Tradesmen Assistant</h3>
          </div>

          {/* Chat content */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[calc(70vh-120px)]">
            <div className="flex items-start mb-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-blue-100 text-blue-500">FB</AvatarFallback>
              </Avatar>
              <div className="bg-blue-50 p-3 rounded-lg max-w-[85%]">
                <p>Hi there 👋 How can I help?</p>
              </div>
            </div>

            {selectedOption && (
              <>
                <div className="flex items-start mb-4 justify-end">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-[85%]">
                    <p>{selectedOption}</p>
                  </div>
                </div>

                <div className="flex items-start mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-blue-100 text-blue-500">FB</AvatarFallback>
                  </Avatar>
                  <div className="bg-blue-50 p-3 rounded-lg max-w-[85%]">
                    <p>{getResponseText()}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Options or input */}
          <div className="p-4 border-t border-border">
            {!selectedOption ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleOptionClick('How do I upload job photos?')}
                  className="w-full text-left p-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  How do I upload job photos?
                </button>
                <button
                  onClick={() => handleOptionClick('What jobs are assigned to me?')}
                  className="w-full text-left p-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  What jobs are assigned to me?
                </button>
                <button
                  onClick={() => handleOptionClick('How do I get paid?')}
                  className="w-full text-left p-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  How do I get paid?
                </button>
              </div>
            ) : (
              <div className="flex">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedOption(null)}
                  className="w-full"
                >
                  Ask another question
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
