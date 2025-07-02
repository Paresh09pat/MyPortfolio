import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiSend,
  FiTwitter,
} from "react-icons/fi";

const Contact = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(contactRef, { once: false, amount: 0.2 });

  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with public key from environment variables
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Letter animation for the heading
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  // Split text into letters for animating each character
  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={char === " " ? "inline-block mr-2" : "inline-block"}
      >
        {char}
      </motion.span>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    console.log("Starting email submission...");

    // EmailJS template parameters - structured for default template
    // const templateParams = {
    //   from_name: formData.name,
    //   reply_to: formData.email,
    //   subject: formData.subject,
    //   message: formData.message
    // };

    const templateParams = {
      to_name: "Paresh Patil",
      user_name: formData.name,
      user_email: formData.email,
      user_subject: formData.subject,
      user_message: formData.message,
      reply_to: formData.email,
    };

    console.log("Template params:", templateParams);

    try {
      // Send email using EmailJS with more direct method
      // const result = await emailjs.send(
      //   "service_zy31zko",  // Service ID
      //   "template_hj4g2ja", // Template ID
      //   templateParams,
      //   "XQcgXepYf-uKanm9f" // Public Key
      // );

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID from env
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID from env
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Public Key from env
      );

      console.log("EmailJS success:", result.text);

      // Success - show message and reset form
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("EmailJS error details:", error);
      setSubmitStatus("error");

      // Try a fallback approach - direct email link
      const mailtoLink = document.createElement("a");
      mailtoLink.href = `mailto:09patilparesh@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;

      // Offer direct email option after error
      setTimeout(() => {
        if (
          confirm(
            "There was an error sending your message. Would you like to open your email client to send it directly?"
          )
        ) {
          mailtoLink.click();
        }
      }, 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      name: "Email",
      icon: FiMail,
      link: "mailto:09patilparesh@gmail.com",
      value: "09patilparesh@gmail.com",
    },
    {
      name: "Phone",
      icon: FiPhone,
      link: "tel:+918007988089",
      value: "+918007988089",
    },
    {
      name: "GitHub",
      icon: FiGithub,
      link: "https://github.com/Paresh09pat",
      value: "https://github.com/Paresh09pat",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      link: "https://www.linkedin.com/in/paresh-patil-6bb7231a3/",
      value: "https://www.linkedin.com/in/paresh-patil-6bb7231a3/",
    },
    {
      name: "Twitter",
      icon: FiTwitter,
      link: "https://x.com/paresh_balu",
      value: "https://x.com/paresh_balu",
    },
  ];

  // Form input animation variants
  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#38BDF8",
      boxShadow: "0 0 15px rgba(56, 189, 248, 0.3)",
    },
    blur: {
      scale: 1,
      borderColor: "rgba(56, 189, 248, 0.2)",
      boxShadow: "0 0 0px rgba(56, 189, 248, 0)",
    },
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-tertiary to-primary relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-secondary/5 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div
          className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl -bottom-48 -right-48 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Added animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, #38BDF8 0%, transparent 30%), radial-gradient(circle at 70% 70%, #F472B6 0%, transparent 30%)",
            backgroundSize: "100% 100%",
            filter: "blur(100px)",
          }}
        />
      </div>

      <motion.div
        ref={contactRef}
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-textPrimary"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block">{splitText("Get In Touch")}</div>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-secondary mx-auto mb-12 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="w-full h-full bg-secondary"
              animate={{
                backgroundImage: [
                  "linear-gradient(90deg, #38BDF8, #F472B6)",
                  "linear-gradient(90deg, #F472B6, #38BDF8)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="text-center text-lg text-textSecondary max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          I'm currently open to new opportunities and collaborations. Whether
          you have a question, project idea, or just want to say hi,{" "}
          <motion.span
            className="text-secondary font-semibold"
            animate={{
              color: ["#38BDF8", "#F472B6", "#38BDF8"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            feel free to reach out!
          </motion.span>{" "}
          For immediate response, you can directly email me at{" "}
          <motion.a
            href="mailto:09patilparesh@gmail.com"
            className="text-secondary underline"
            whileHover={{ scale: 1.05 }}
          >
            09patilparesh@gmail.com
          </motion.a>
        </motion.p>

        {/* Grid Layout for Contact Info and Form */}
        <div className="grid md:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Links - 4 columns on desktop */}
          <motion.div
            className="md:col-span-4 space-y-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.h3
              className="text-2xl font-bold text-textPrimary mb-6"
              variants={itemVariants}
            >
              Contact Information
            </motion.h3>

            <div className="space-y-4">
              {contactLinks.map((contact, index) => (
                <motion.a
                  key={contact.name}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-tertiary/50 rounded-lg flex items-center space-x-4 transition-all duration-300 relative border border-transparent"
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.1,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(56, 189, 248, 0.1)",
                    borderColor: "rgba(56, 189, 248, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 bg-secondary/10 rounded-lg transition-colors duration-300">
                    <contact.icon size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-textPrimary mb-1">
                      {contact.name}
                    </h3>
                    <p className="text-textSecondary font-mono text-xs">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-8 pt-8 border-t border-tertiary/30"
              variants={itemVariants}
            >
              <p className="text-textSecondary text-sm">
                Looking forward to hearing from you! I typically respond within
                24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form - 8 columns on desktop */}
          <motion.div className="md:col-span-8" variants={itemVariants}>
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-tertiary/30 backdrop-blur-sm p-8 rounded-2xl border border-secondary/10 shadow-lg shadow-secondary/5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-textPrimary mb-6">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full p-4 pl-5 bg-tertiary/50 border text-textPrimary rounded-lg focus:outline-none ${
                      formErrors.name ? "border-red-500" : "border-secondary/20"
                    }`}
                    whileFocus="focus"
                    whileTap="focus"
                    variants={inputVariants}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.name}
                    </p>
                  )}
                  <motion.span
                    className="absolute h-full w-1 bg-secondary left-0 top-0 rounded-l-lg"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full p-4 pl-5 bg-tertiary/50 border text-textPrimary rounded-lg focus:outline-none ${
                      formErrors.email
                        ? "border-red-500"
                        : "border-secondary/20"
                    }`}
                    whileFocus="focus"
                    whileTap="focus"
                    variants={inputVariants}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  )}
                  <motion.span
                    className="absolute h-full w-1 bg-secondary left-0 top-0 rounded-l-lg"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="mb-6 relative">
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={`w-full p-4 pl-5 bg-tertiary/50 border text-textPrimary rounded-lg focus:outline-none ${
                    formErrors.subject
                      ? "border-red-500"
                      : "border-secondary/20"
                  }`}
                  whileFocus="focus"
                  whileTap="focus"
                  variants={inputVariants}
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.subject}
                  </p>
                )}
                <motion.span
                  className="absolute h-full w-1 bg-secondary left-0 top-0 rounded-l-lg"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>

              {/* Message Field */}
              <div className="mb-6 relative">
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="6"
                  className={`w-full p-4 pl-5 bg-tertiary/50 border text-textPrimary rounded-lg focus:outline-none ${
                    formErrors.message
                      ? "border-red-500"
                      : "border-secondary/20"
                  }`}
                  whileFocus="focus"
                  whileTap="focus"
                  variants={inputVariants}
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.message}
                  </p>
                )}
                <motion.span
                  className="absolute h-full w-1 bg-secondary left-0 top-0 rounded-l-lg"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative flex items-center justify-center w-full md:w-auto px-8 py-4 bg-secondary text-primary rounded-lg font-semibold overflow-hidden disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <motion.span
                    animate={isSubmitting ? { rotate: 360 } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <FiSend size={18} />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-accent"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Form Status Message */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    className="mt-4 p-4 rounded-lg flex items-center gap-2 bg-green-500/20 text-green-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiCheckCircle size={20} />
                    <span>
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    className="mt-4 p-4 rounded-lg flex items-center gap-2 bg-red-500/20 text-red-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiAlertCircle size={20} />
                    <span>
                      There was an error sending your message. Please try again
                      or email directly.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
