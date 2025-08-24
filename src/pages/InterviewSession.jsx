// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getAuthToken, fetchWithToken } from "../utils/handleToken";
// import { Loader2, ArrowLeft, Send, MessageCircle, User } from "lucide-react";

// const InterviewSession = () => {
//   const { interviewId } = useParams();
//   const navigate = useNavigate();
//   const token = getAuthToken();

//   const [loading, setLoading] = useState(true);
//   const [sessionId, setSessionId] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [answer, setAnswer] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [completed, setCompleted] = useState(false);
//   const [error, setError] = useState(null);
//   const [showWelcome, setShowWelcome] = useState(true);
//   const [endTime, setEndTime] = useState(null);
//   const [interviewActive, setInterviewActive] = useState(false);

//   const hasInitialized = useRef(false);
//   const chatEndRef = useRef(null);
//   const [questionLoading, setQuestionLoading] = useState(false);
//    const API_URL = import.meta.env.VITE_API_URL;

//   // ✅ Auto-scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory]);

//   // ✅ Fetch interview details & initialize
//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     if (hasInitialized.current) return;
//     hasInitialized.current = true;

//     const initSession = async () => {
//       try {
//         const API_URL = import.meta.env.VITE_API_URL;
//         const interviewData = await fetchWithToken(
//           `${API_URL}/interview/get-all-interviews/`,
//           token
//         );
//         const currentInterview = interviewData.find(
//           (item) => item.id === parseInt(interviewId)
//         );

//         if (!currentInterview) {
//           setError("Interview not found.");
//           setLoading(false);
//           return;
//         }

//         const now = new Date();
//         const start = new Date(currentInterview.startTime);
//         const end = new Date(currentInterview.endTime);
//         setEndTime(end);

//         if (now < start) {
//           setError("Interview has not started yet.");
//           setLoading(false);
//           return;
//         }
//         if (now > end) {
//           setError("Interview time has ended.");
//           setLoading(false);
//           return;
//         }

//         setInterviewActive(true);
        
//         const data = await fetchWithToken(
//           `${API_URL}/interview/interview-session-initializer/${interviewId}/`,
//           token,
//           null,
//           "POST"
//         );

//         if (!data || !data.session_id) {
//           setError(data?.error || "Failed to start interview.");
//         } else {
//           setSessionId(data.session_id);
//           setCurrentQuestion(data.question);
//         }
//       } catch (err) {
//         setError("Error initializing session.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initSession();
//   }, [interviewId, token, navigate]);

//   // ✅ Auto-end interview when endTime reached
//   useEffect(() => {
//     if (!endTime) return;
//     const timer = setInterval(() => {
//       if (new Date() >= endTime) {
//         setCompleted(true);
//         setCurrentQuestion(null);
//         clearInterval(timer);
//       }
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [endTime]);

//   // ✅ Redirect to previous page after completion
//   // ✅ Redirect to DasInterViewPlatform after completion
// useEffect(() => {
//   console.log("no poskjqnwjwqn")
//   if (completed && sessionId) {
//     console.log("eqv 2hbjqn2knw2qini23i")
//     navigate(`/dsa-interview-platform/${sessionId}`);
//   }
// }, [completed, sessionId, navigate]);


//   // ✅ Submit answer
//   const handleNext = async () => {
//   if (!answer.trim()) return;

//   setChatHistory((prev) => [...prev, { question: currentQuestion, answer }]);
//   setAnswer("");
//   setQuestionLoading(true);   // ✅ Trigger loading state first

//   try {
//     const data = await fetchWithToken(
//       `${API_URL}/interview/interview-session/${sessionId}/?answer=${encodeURIComponent(answer)}`,
//       token,
//       null,
//       "POST"
//     );

//     if (!data) {
//       setError("Error submitting answer.");
//       return;
//     }

//     if (data.completed) {
//       setCompleted(true);
//     } else {
//       setCurrentQuestion(data.current_question);
//     }
//   } catch (err) {
//     setError("Error submitting answer.");
//   } finally {
//     setQuestionLoading(false); // ✅ Stop loader once everything is ready
//   }
// };



//   const handleStartInterview = () => setShowWelcome(false);

//   // ✅ Loading
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
//         <Loader2 className="animate-spin w-10 h-10 text-purple-400" />
//       </div>
//     );
//   }

//   // ✅ Error screen
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <p className="text-xl text-red-400">{error}</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-200"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // ✅ Welcome Screen
//   if (showWelcome) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
//         <div className="bg-slate-800/60 p-12 rounded-2xl border border-slate-700/50 shadow-2xl max-w-md w-full mx-4 text-center">
//           <div className="bg-purple-600/20 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
//             <MessageCircle size={48} className="text-purple-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-purple-300 mb-4">
//             Welcome to the Interview
//           </h1>
//           <p className="text-slate-300 mb-8 text-lg leading-relaxed">
//             You're about to begin your interview session. Take your time with
//             each question and answer thoughtfully.
//           </p>
//           <button
//             onClick={handleStartInterview}
//             className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
//           >
//             Start Interview
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Completion Screen
//   if (completed) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
//         <div className="bg-green-700/30 border border-green-500/30 p-12 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center">
//           <div className="bg-green-600/20 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
//             <MessageCircle size={48} className="text-green-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-green-300 mb-4">
//             Thank you for attending the interview!
//           </h1>
//           <p className="text-green-200 text-lg">
//             Redirecting to dashboard in a moment...
//           </p>
//           <div className="mt-6">
//             <Loader2 className="animate-spin w-6 h-6 text-green-400 mx-auto" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Main Interview UI
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
//       <div className="flex h-[calc(100vh-100px-5rem)]"> {/* Adjusted height to account for sticky header */}
//         {/* Chat History */}
//         <div className="w-1/3 bg-slate-800/40 border-r border-slate-700/50 flex flex-col">
//           <div className="p-4 border-b border-slate-700/50">
//             <h2 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
//               <MessageCircle size={20} /> Chat History
//             </h2>
//           </div>
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {chatHistory.length === 0 ? (
//               <div className="text-center text-slate-400 mt-8">
//                 <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
//                 <p>No messages yet</p>
//                 <p className="text-sm mt-2">Your conversation will appear here</p>
//               </div>
//             ) : (
//               chatHistory.map((item, index) => (
//                 <div key={index} className="space-y-3">
//                   {/* Question */}
//                   <div className="flex gap-3">
//                     <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                       <MessageCircle size={16} className="text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="bg-slate-700/50 p-3 rounded-lg">
//                         <p className="text-purple-300 font-medium text-sm">
//                           Question {index + 1}
//                         </p>
//                         <p className="text-slate-200 mt-1">{item.question}</p>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Answer */}
//                   <div className="flex gap-3">
//                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
//                       <User size={16} className="text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="bg-slate-600/50 p-3 rounded-lg">
//                         <p className="text-blue-300 font-medium text-sm">
//                           Your Answer
//                         </p>
//                         <p className="text-slate-200 mt-1">{item.answer}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={chatEndRef} />
//           </div>
//         </div>

//         {/* Question Section */}
//         <div className="flex-1 flex flex-col">
//           <div className="flex-1 p-6 flex items-center justify-center">
//             {questionLoading ? (
//   <div className="flex justify-center items-center h-60">
//     <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
//     <p className="ml-4 text-slate-300 text-lg">Evaluating your response...</p>
//   </div>
// ) : currentQuestion && (

//               <div className="max-w-3xl w-full">
//                 <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
//                       <MessageCircle size={20} className="text-white" />
//                     </div>
//                     <h3 className="text-xl font-bold text-purple-300">
//                       Question {chatHistory.length + 1}
//                     </h3>
//                   </div>
//                   <p className="text-xl text-slate-200 mb-8 leading-relaxed">
//                     {currentQuestion}
//                   </p>
//                   <div className="space-y-4">
//                     <textarea
//                       value={answer}
//                       onChange={(e) => setAnswer(e.target.value)}
//                       className="w-full bg-slate-900 text-white p-4 rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
//                       rows="6"
//                       placeholder="Type your answer here..."
//                     />
//                     <div className="flex justify-end">
//                       <button
//                         onClick={handleNext}
//                         disabled={!answer.trim()}
//                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed px-8 py-3 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
//                       >
//                         <Send size={18} /> Submit Answer
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default InterviewSession;
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthToken, fetchWithToken } from "../utils/handleToken";
import { Loader2, Send, MessageCircle, User, Mic, MicOff, Volume2, VolumeX, Play, Sparkles } from "lucide-react";

const InterviewSession = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const token = getAuthToken();

  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [endTime, setEndTime] = useState(null);
  const [interviewActive, setInterviewActive] = useState(false);

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const hasInitialized = useRef(false);
  const chatEndRef = useRef(null);
  const [questionLoading, setQuestionLoading] = useState(false);
  const recognitionRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setAnswer(prev => {
          const withoutInterim = prev.replace(/\[.*?\]/g, '');
          return finalTranscript ? withoutInterim + finalTranscript : withoutInterim + `[${interimTranscript}]`;
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setAnswer(prev => prev.replace(/\[.*?\]/g, ''));
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Text-to-speech function
  const speakText = (text) => {
    if (!speechEnabled || !text) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Auto-speak new questions
  useEffect(() => {
    if (currentQuestion && !questionLoading && speechEnabled) {
      setTimeout(() => speakText(currentQuestion), 500);
    }
  }, [currentQuestion, questionLoading, speechEnabled]);

  // Toggle speech recognition
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Toggle text-to-speech
  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (speechEnabled) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Replay current question
  const replayQuestion = () => {
    if (currentQuestion) {
      speakText(currentQuestion);
    }
  };

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // ✅ Fetch interview details & initialize (but don't start session yet)
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initInterviewDetails = async () => {
      try {
        const interviewData = await fetchWithToken(
          `${API_URL}/interview/get-all-interviews/`,
          token
        );
        const currentInterview = interviewData.find(
          (item) => item.id === parseInt(interviewId)
        );

        if (!currentInterview) {
          setError("Interview not found.");
          setLoading(false);
          return;
        }

        const now = new Date();
        const start = new Date(currentInterview.startTime);
        const end = new Date(currentInterview.endTime);
        setEndTime(end);

        if (now < start) {
          setError("Interview has not started yet.");
          setLoading(false);
          return;
        }
        if (now > end) {
          setError("Interview time has ended.");
          setLoading(false);
          return;
        }

        setInterviewActive(true);
        setLoading(false);
        
        // Don't initialize session yet - wait for user to click start
      } catch (err) {
        setError("Error loading interview details.");
        setLoading(false);
      }
    };

    initInterviewDetails();
  }, [interviewId, token, navigate]);

  // ✅ Auto-end interview when endTime reached
  useEffect(() => {
    if (!endTime) return;
    const timer = setInterval(() => {
      if (new Date() >= endTime) {
        setCompleted(true);
        setCurrentQuestion(null);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  // ✅ Redirect to DasInterViewPlatform after completion
  useEffect(() => {
    if (completed && sessionId) {
      navigate(`/dsa-interview-platform/${sessionId}`);
    }
  }, [completed, sessionId]);

  // ✅ Submit answer
  const handleNext = async () => {
    if (!answer.trim()) return;

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setChatHistory((prev) => [...prev, { question: currentQuestion, answer }]);
    setAnswer("");
    setQuestionLoading(true);

    try {
      const data = await fetchWithToken(
        `${API_URL}/interview/interview-session/${sessionId}/?answer=${encodeURIComponent(answer)}`,
        token,
        null,
        "POST"
      );

      if (!data) {
        setError("Error submitting answer.");
        return;
      }

      if (data.completed) {
        setCompleted(true);
      } else {
        setCurrentQuestion(data.current_question);
      }
    } catch (err) {
      setError("Error submitting answer.");
    } finally {
      setQuestionLoading(false);
    }
  };

  const handleStartInterview = async () => {
    setLoading(true);
    
    try {
      // Initialize the actual interview session when user clicks start
      const data = await fetchWithToken(
        `${API_URL}/interview/interview-session-initializer/${interviewId}/`,
        token,
        null,
        "POST"
      );

      if (!data || !data.session_id) {
        setError(data?.error || "Failed to start interview.");
        setLoading(false);
        return;
      }

      setSessionId(data.session_id);
      setCurrentQuestion(data.question);
      setShowWelcome(false);
      
      // Welcome message after session starts
      if (speechEnabled) {
        setTimeout(() => speakText("Welcome to your interview. Let's begin with the first question."), 1000);
      }
    } catch (err) {
      setError("Error starting interview session.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50 text-purple-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping"></div>
            <Loader2 className="relative animate-spin w-12 h-12 text-purple-600" />
          </div>
          <p className="text-lg font-medium">Preparing your interview...</p>
        </div>
      </div>
    );
  }

  // ✅ Error screen
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50 text-purple-900">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-purple-200 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ✅ Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50 flex items-center justify-center p-4">
        <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl border border-purple-200/50 shadow-2xl max-w-lg w-full text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-lavender-200 to-transparent rounded-full translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Sparkles size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
              AI Voice Interview
            </h1>
            <p className="text-purple-700 mb-8 text-lg leading-relaxed">
              Experience a natural conversation with our AI interviewer. Questions will be read aloud and you can respond using voice input for a seamless interview experience.
            </p>
            <div className="flex items-center justify-center space-x-6 mb-8 text-sm text-purple-600">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Voice Questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mic className="w-5 h-5" />
                <span>Voice Answers</span>
              </div>
            </div>
            <button
              onClick={handleStartInterview}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:from-purple-700 hover:to-purple-800"
            >
              Begin Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Completion Screen
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50 flex items-center justify-center p-4">
        <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl border border-green-200/50 shadow-2xl max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-purple-50 opacity-50"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Sparkles size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Interview Complete!
            </h1>
            <p className="text-purple-700 text-lg mb-6">
              Thank you for your time. We'll be in touch soon with the results.
            </p>
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Redirecting to dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Main Interview UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50">
      {/* Modern Header with Voice Controls */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-200/50 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  AI Voice Interview
                </h1>
                {isSpeaking && (
                  <div className="flex items-center space-x-2 text-green-600 text-sm mt-1">
                    <Volume2 size={14} className="animate-pulse" />
                    <span>AI is speaking...</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSpeech}
                className={`p-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                  speechEnabled 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700' 
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                }`}
                title={speechEnabled ? 'Disable voice' : 'Enable voice'}
              >
                {speechEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              
              {currentQuestion && (
                <button
                  onClick={replayQuestion}
                  className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  title="Replay question"
                >
                  <Play size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Chat History Sidebar */}
        <div className="w-1/3 bg-white/60 backdrop-blur-md border-r border-purple-200/50 flex flex-col">
          <div className="p-6 border-b border-purple-200/50">
            <h2 className="text-xl font-bold text-purple-800 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <span>Conversation</span>
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatHistory.length === 0 ? (
              <div className="text-center text-purple-400 mt-16">
                <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-purple-300" />
                </div>
                <p className="text-lg font-medium mb-2">No messages yet</p>
                <p className="text-sm">Your conversation will appear here as you progress</p>
              </div>
            ) : (
              chatHistory.map((item, index) => (
                <div key={index} className="space-y-4">
                  {/* Question */}
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MessageCircle size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-purple-200/50">
                        <p className="text-purple-600 font-semibold text-sm mb-2">
                          Question {index + 1}
                        </p>
                        <p className="text-purple-800 leading-relaxed">{item.question}</p>
                      </div>
                    </div>
                  </div>
                  {/* Answer */}
                  <div className="flex space-x-4 ml-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200/50">
                        <p className="text-blue-600 font-semibold text-sm mb-2">
                          Your Response
                        </p>
                        <p className="text-blue-800 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Main Question Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 flex items-start justify-center overflow-y-auto">
            {questionLoading ? (
              <div className="flex flex-col items-center justify-center space-y-6 min-h-[500px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                </div>
                <p className="text-xl font-semibold text-purple-700">Analyzing your response...</p>
                <p className="text-purple-500">Please wait while we prepare the next question</p>
              </div>
            ) : currentQuestion && (
              <div className="max-w-4xl w-full">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-purple-200/50 shadow-2xl relative overflow-hidden">
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
                  
                  <div className="relative z-10 p-10">
                    {/* Question Header - Fixed Height */}
                    <div className="flex items-center space-x-4 mb-8 h-16">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <MessageCircle size={20} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-purple-800">
                          Question {chatHistory.length + 1}
                        </h3>
                      </div>
                      {isSpeaking && (
                        <div className="flex items-center space-x-2 text-green-600 flex-shrink-0">
                          <Volume2 size={20} className="animate-pulse" />
                          <span className="text-sm font-medium">Speaking...</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Question Box - Fixed Height */}
                    <div className="mb-8 h-32">
                      <div className="h-full p-6 bg-gradient-to-r from-purple-50 to-lavender-50 rounded-2xl border border-purple-200/50 overflow-y-auto">
                        <p className="text-xl text-purple-800 leading-relaxed font-medium">
                          {currentQuestion}
                        </p>
                      </div>
                    </div>
                    
                    {/* Answer Section - Fixed Layout */}
                    <div className="space-y-6">
                      <div className="relative">
                        <textarea
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="w-full h-40 bg-white/90 backdrop-blur-sm text-purple-800 p-6 rounded-2xl border border-purple-200/50 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 resize-none text-lg shadow-sm"
                          placeholder="Share your thoughts here or use the voice input..."
                        />
                        
                        {/* Voice Input Button - Fixed Position */}
                        <button
                          onClick={toggleListening}
                          className={`absolute bottom-6 right-6 p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                            isListening 
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse hover:from-red-600 hover:to-red-700' 
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                          }`}
                          title={isListening ? 'Stop recording' : 'Start voice input'}
                        >
                          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                      </div>
                      
                      {/* Controls Row - Fixed Height */}
                      <div className="flex justify-between items-center h-12">
                        <div className="text-sm flex-1">
                          {isListening && (
                            <div className="flex items-center space-x-3 text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-200 w-fit">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="font-medium">Recording your voice... Click mic to stop</span>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={handleNext}
                          disabled={!answer.trim()}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl flex items-center space-x-3 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-sm flex-shrink-0"
                        >
                          <Send size={20} /> 
                          <span>Submit Answer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;