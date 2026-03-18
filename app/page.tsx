"use client"

import { useEffect, useRef } from "react"

export default function Home() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mouse Blob Follower
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (blob) {
        blob.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      }

      // Letter hover effect
      const allInteractiveText = document.querySelectorAll(".interactive-text")
      allInteractiveText.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const distance = Math.sqrt(
          Math.pow(x - (rect.left + rect.width / 2), 2) + Math.pow(y - (rect.top + rect.height / 2), 2)
        )
        
        if (distance < 100) {
          element.classList.add("near-cursor")
        } else {
          element.classList.remove("near-cursor")
        }
      })

      // Navbar and footer hover effect
      const navLinks = document.querySelectorAll("nav a, .logo, footer a, .footer-cta a")
      navLinks.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const distance = Math.sqrt(
          Math.pow(x - (rect.left + rect.width / 2), 2) + Math.pow(y - (rect.top + rect.height / 2), 2)
        )
        
        if (distance < 80) {
          element.classList.add("near-cursor")
        } else {
          element.classList.remove("near-cursor")
        }
      })
    }
    document.addEventListener("mousemove", handleMouseMove)

    // Parallax Effect
    const handleScroll = () => {
      const scroll = window.pageYOffset

      const heroImg = document.getElementById("hero-img")
      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.2}px)) scale(${1 + scroll * 0.0005})`
      }

      // Floating labels in project section
      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        ;(label as HTMLElement).style.transform = `translateY(${scroll * 0.1 * direction}px)`
      })
    }
    window.addEventListener("scroll", handleScroll)

    // Scroll Reveal Animation (for about section and other reveal elements)
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".reveal-text, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .word-reveal").forEach((el) => {
      observer.observe(el)
    })

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const href = (this as HTMLAnchorElement).getAttribute("href")
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <nav>
        <div className="logo">MEENA DEV ©26</div>
        <ul className="nav-links">
          <li>
            <a href="#work">Portfolio</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <img
            src="/meena.jpeg"
            alt="MERN Stack Development"
            className="hero-img"
            id="hero-img"
          />
          <div className="hero-vertical-text hero-vertical-left interactive-text">
            <span>M</span>
            <span>E</span>
            <span>R</span>
            <span>N</span>
          </div>
          <div className="hero-vertical-text hero-vertical-right interactive-text">
            <span>S</span>
            <span>T</span>
            <span>A</span>
            <span>C</span>
            <span>K</span>
          </div>
          <div className="hero-horizontal-text hero-text-bottom interactive-text">
            <span>D</span><span>E</span><span>V</span><span>E</span><span>L</span><span>O</span><span>P</span><span>E</span><span>R</span>
          </div>
        </section>

        {/* INTRO */}
        <section id="intro">
          <div className="container">
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "3rem",
                  fontFamily: "var(--syne)",
                  marginBottom: "40px",
                }}
              >
                I BUILD <span className="highlight">FULL-STACK WEB APPS</span> WITH THE MERN STACK.
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#888",
                }}
              >
                <span className="highlight">MERN Stack Developer.</span> Passionate problem solver. I specialize in crafting <span className="highlight">scalable, high-performance applications</span> using MongoDB, Express.js, React, and Node.js — from REST APIs to real-time web apps.
              </p>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type tech-stack">MONGODB — EXPRESS.JS — REACT — NODE.JS — </span>
            <span className="huge-type tech-stack">MONGODB — EXPRESS.JS — REACT — NODE.JS — </span>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about">
          <div className="container">
            <div className="about-section">
              <div className="scroll-reveal">
                <h2 className="about-heading">ABOUT ME</h2>
              </div>
              <div className="about-content">
                <div className="about-text">
                  <div className="scroll-reveal-left">
                    <p className="about-paragraph">
                      Hey there! I&apos;m <span className="highlight">Meena</span>, a passionate MERN Stack Developer who loves turning ideas into fully functional web applications. With a deep understanding of <span className="highlight">MongoDB, Express.js, React, and Node.js</span>, I build end-to-end solutions that are fast, scalable, and user-friendly.
                    </p>
                  </div>
                  <div className="scroll-reveal-left" style={{ transitionDelay: "0.2s" }}>
                    <p className="about-paragraph">
                      I thrive on solving complex problems and creating seamless digital experiences. Whether it&apos;s designing <span className="highlight">RESTful APIs</span>, building real-time features with WebSockets, or crafting pixel-perfect React interfaces — I bring dedication and clean code to every project.
                    </p>
                  </div>
                  <div className="scroll-reveal-left" style={{ transitionDelay: "0.4s" }}>
                    <p className="about-paragraph">
                      When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical blog posts. I believe in <span className="highlight">continuous learning</span> and pushing boundaries to deliver exceptional results.
                    </p>
                  </div>
                </div>
                <div className="about-skills">
                  <div className="scroll-reveal-right">
                    <h3 className="skills-heading">WHAT I DO</h3>
                  </div>
                  <div className="skills-grid">
                    <div className="skill-card scroll-reveal-right" style={{ transitionDelay: "0.1s" }}>
                      <h4>FRONTEND</h4>
                      <p>React, Redux, Next.js, HTML5, CSS3, JavaScript ES6+</p>
                    </div>
                    <div className="skill-card scroll-reveal-right" style={{ transitionDelay: "0.2s" }}>
                      <h4>BACKEND</h4>
                      <p>Node.js, Express.js, REST APIs, GraphQL, Socket.io</p>
                    </div>
                    <div className="skill-card scroll-reveal-right" style={{ transitionDelay: "0.3s" }}>
                      <h4>DATABASE</h4>
                      <p>MongoDB, Mongoose, Firebase, Redis, PostgreSQL</p>
                    </div>
                    <div className="skill-card scroll-reveal-right" style={{ transitionDelay: "0.4s" }}>
                      <h4>TOOLS</h4>
                      <p>Git, Docker, AWS, Vercel, Postman, VS Code</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK SECTION */}
        <section id="work" className="container">
          <div className="sticky-type">ARCHIVE</div>

          {/* Project 1 */}
          <div className="project-row">
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>001 / E-COMMERCE</span>
              <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                SHOPIFY
              </h3>
              <p>
                A <span className="highlight">full-stack e-commerce platform</span> built with the MERN stack featuring <span className="highlight">JWT authentication</span>, Stripe payment integration, and a responsive admin dashboard for product management.
              </p>
              <div className="divider"></div>
              <div style={{ marginBottom: "15px", color: "#888", fontSize: "0.9rem" }}>YEAR: 2026</div>
              <div className="tech-list">
                <span className="tech-pill">MongoDB</span>
                <span className="tech-pill">Express.js</span>
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">Stripe</span>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/Shopify-project.webp"
                alt="Shopify E-Commerce Platform"
                className="project-image"
              />
              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                SHOP
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-row" style={{ flexDirection: "row-reverse" }}>
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>002 / REAL-TIME APP</span>
              <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                CHATLY
              </h3>
              <p>
                <span className="highlight">Real-time messaging application</span> powered by Socket.io and the MERN stack, featuring <span className="highlight">group chats, typing indicators</span>, file sharing, and end-to-end message encryption.
              </p>
              <div className="divider"></div>
              <div style={{ marginBottom: "15px", color: "#888", fontSize: "0.9rem" }}>YEAR: 2026</div>
              <div className="tech-list">
                <span className="tech-pill">MongoDB</span>
                <span className="tech-pill">Express.js</span>
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">Socket.io</span>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/chatly-project.webp"
                alt="Chatly Real-Time App"
                className="project-image"
              />
              <div
                className="floating-label huge-type outline-text"
                style={{ fontSize: "8rem", right: "auto", left: "-100px" }}
              >
                CHAT
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-row">
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>003 / PRODUCTIVITY</span>
              <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                TASKFLOW
              </h3>
              <p>
                A <span className="highlight">collaborative task management tool</span> with drag-and-drop Kanban boards, <span className="highlight">real-time team collaboration</span>, role-based access control, and automated workflow triggers powered by the MERN stack.
              </p>
              <div className="divider"></div>
              <div style={{ marginBottom: "15px", color: "#888", fontSize: "0.9rem" }}>YEAR: 2026</div>
              <div className="tech-list">
                <span className="tech-pill">MongoDB</span>
                <span className="tech-pill">Express.js</span>
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">Redux</span>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/taskflow.webp"
                alt="Taskflow Productivity Tool"
                className="project-image"
              />
              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                FLOW
              </div>
            </div>
          </div>

          {/* Project 4 */}
          <div className="project-row" style={{ flexDirection: "row-reverse" }}>
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>004 / CONTENT PLATFORM</span>
              <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                DEVBLOG
              </h3>
              <p>
                A <span className="highlight">full-featured developer blogging platform</span> with a rich markdown editor, <span className="highlight">SEO optimization</span>, comment system with nested threads, and a personalized content recommendation engine.
              </p>
              <div className="divider"></div>
              <div style={{ marginBottom: "15px", color: "#888", fontSize: "0.9rem" }}>YEAR: 2026</div>
              <div className="tech-list">
                <span className="tech-pill">MongoDB</span>
                <span className="tech-pill">Express.js</span>
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">Cloudinary</span>
              </div>
            </div>
            <div className="project-media">
              <img
                src="/devbblog.webp"
                alt="DevBlog Content Platform"
                className="project-image"
              />
              <div
                className="floating-label huge-type outline-text"
                style={{ fontSize: "8rem", right: "auto", left: "-100px" }}
              >
                BLOG
              </div>
            </div>
          </div>
        </section>


        {/* FOOTER */}
        <footer id="contact">
          <div className="container">
            <div className="footer-cta">
              <a href="mailto:meena55619@gmail.com">LET&apos;S — BUILD</a>
            </div>
            <div className="divider"></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--syne)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                color: "#555",
              }}
            >
              <div>© 2026 MEENA DEV</div>
              <div style={{ display: "flex", gap: "30px" }}>
                <a href="https://github.com/meena55619" target="_blank" rel="noopener noreferrer" className="footer-link">GITHUB</a>
                <a href="https://www.linkedin.com/in/meena-v-d-60b434377" target="_blank" rel="noopener noreferrer" className="footer-link">LINKEDIN</a>
                <a href="mailto:meena55619@gmail.com" className="footer-link">GMAIL</a>
              </div>
              <div>AVAILABLE FOR FREELANCE WORK</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
