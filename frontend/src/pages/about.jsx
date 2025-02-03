import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Yoga Pose Estimation</h1>
        <p style={styles.subheading}>
          Harnessing AI for Better Yoga Practice
        </p>
      </div>
      
      <div style={styles.banner}>
          <img
              src="/imgs/yogaBanner.jpeg"
              className="yoga-title"
              alt="Yoga Banner"
              style={styles.bannerImage}
            />
      </div>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Introduction</h2>
        <p style={styles.text}>
          Yoga, a timeless exercise from India, has become globally popular due to its numerous spiritual, physical, and mental benefits. However, practicing yoga correctly is vital, as incorrect postures can lead to ineffective results or even injury. This project focuses on using AI to identify and correct yoga poses, making yoga practice more accessible and safer for people worldwide.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Scope</h2>
        <p style={styles.text}>
          The app aims to provide real-time feedback on yoga postures using computer vision and machine learning. It helps users, whether beginners or advanced practitioners, to refine their poses and get personalized tips. The app can also assist yoga instructors in monitoring students' forms remotely.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Motivation</h2>
        <p style={styles.text}>
          During the COVID-19 pandemic, many individuals faced physical and mental health challenges. Yoga emerged as a powerful remedy, enhancing physical, mental, and spiritual well-being. With this project, we aim to offer a solution for people who wish to practice yoga at home, providing them with instant feedback on their postures for a safer, more effective practice.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Objectives</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>To provide an AI-based system for detecting and correcting yoga poses in real-time.</li>
          <li style={styles.listItem}>To offer personalized feedback based on users' form and progression.</li>
          <li style={styles.listItem}>To include a variety of poses and styles for all levels of practitioners.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Contact Us</h2>
        <div style={styles.socialLinks}>
          <a href="https://www.linkedin.com/in/surajchandramauli/" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
            <img src="imgs/5296501_linkedin_network_linkedin logo_icon.png" alt="LinkedIn" style={styles.socialIcon} />
          </a>
          <a href="https://github.com/SurajChandramauli" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
            <img src="imgs/291716_github_logo_social network_social_icon.png" alt="GitHub" style={styles.socialIcon} />
          </a>
          <a href="https://www.instagram.com/surajchandramauli/" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
            <img src="imgs/1298747_instagram_brand_logo_social media_icon.png" alt="Instagram" style={styles.socialIcon} />
          </a>
        </div>
      </section>

      <footer style={styles.footer}>
        <p style={styles.footerText}> &copy; Copyright 2023. &copy;Suraj Chandramauli</p>
        <p style={styles.footerText}> Dveloped with ❤️ by Chandramauli</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#fefefe",
    padding: "20px 50px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "3em",
    color: "#d32f2f",
  },
  subheading: {
    fontSize: "1.5em",
    color: "#d32f2f",
    textAlign:"center",
  },
  banner: {
    width: "100%",  // Ensures the container takes up full width
    marginBottom: "40px",
  },
  bannerImage: {
    width: "99%",  // Stretches the image to fill the container
    height: "auto", // Keep the aspect ratio intact (auto adjusts height)
    objectFit: "fill",  // Ensures the image covers the entire container (if stretching both ways)
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin:"none",
    maxWidth: "1100px",
    maxHeight: "300px",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  sectionHeading: {
    fontSize: "2em",
    color: "#d32f2f",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.2em",
    color: "#555",
  },
  list: {
    listStyleType: "circle",
    paddingLeft: "20px",
  },
  listItem: {
    fontSize: "1.2em",
    color: "#555",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  iconLink: {
    display: "inline-block",
  },
  socialIcon: {
    width: "40px",
    height: "40px",
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    position: "center",
    bottom: "0",
    width: "100%",
    boxSizing: "border-box",
  },
  footerText: {
    fontSize: "1.2em",
    margin: 0,
    position: "center",
    textAlign:"center"
  },
};

export default About;
