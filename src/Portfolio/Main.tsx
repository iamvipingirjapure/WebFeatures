import { motion } from "framer-motion";

export default function Main() {
    const styles = {
        app: {
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            backgroundColor: '#f9f9f9',
            color: '#333',
            padding: '20px',
            border: '1px solid red'
        },
        banner: {
            background: 'linear-gradient(135deg, #1e90ff, #00bfff)',
            padding: '40px 20px',
            color: '#fff',
            textAlign: 'center' as 'center',
            borderRadius: '12px',
            marginBottom: '40px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        },
        hero: {
            textAlign: 'center' as 'center',
            marginBottom: '40px'
        },
        heroH1: {
            fontSize: '2.5rem',
            color: '#1e90ff'
        },
        heroH2: {
            fontSize: '1.5rem',
            color: '#333'
        },
        heroP: {
            fontSize: '1rem',
            color: '#777'
        },
        section: {
            marginBottom: '40px'
        },
        sectionH2: {
            color: '#1e90ff',
            marginBottom: '20px'
        },
        sectionH3: {
            margin: '10px 0 5px',
            color: '#333'
        },
        sectionP: {
            margin: '2px 0',
            color: '#555'
        },
        skillsList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '15px',
            padding: 0,
            listStyle: 'none'
        },
        skillItem: {
            backgroundColor: '#ffffff',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            textAlign: 'center' as 'center'
        }
    };

    const skills = [
        "React.js", "Next.js", "TypeScript", "Redux.js", "Node.js", "Express.js",
        "JavaScript", "HTML5", "CSS", "MongoDB", "REST APIs", "Responsive Web Design",
        "React Native", "Wireframing", "User Experience (UX)", "Cross-browser Compatibility",
        "Code Review", "Unit Testing", "Material UI", "Axios", "Context API", "Git", "Figma",
        "Jest", "Enzyme", "Testing-Library"
    ];

    const projects = [
        "Asset Management System",
        "Modular Feature Components",
        "Razor, Adyen, and CCAvenue Payment Blocks",
        "CV Resume Builder",
        "Climate Hazard Info (Mapbox integration)",
        "Pantalone E-Commerce Platform",
        "Taxi Booking App (England)",
        "Real Estate Application",
        "Bus Booking Admin Panel"
    ];

    return (
        <div style={styles.app}>
            <motion.div
                style={styles.banner}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>Welcome to My Portfolio</h1>
                <p>Crafting elegant user experiences with modern web technologies.</p>
            </motion.div>

            <motion.section
                style={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <h1 style={styles.heroH1}>Vipin Girjapure</h1>
                <h2 style={styles.heroH2}>SDE II | React JS</h2>
                <p style={styles.heroP}>Hyderabad, Telangana, India</p>
            </motion.section>

            <motion.section
                style={styles.section}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 style={styles.sectionH2}>Experience</h2>
                <div>
                    <h3 style={styles.sectionH3}>Software Engineer - Extended Web AppTech</h3>
                    <p style={styles.sectionP}>Sept 2022 - Present | Hyderabad</p>
                    <p style={styles.sectionP}>Trained 30+ freshers, recognized with "Pillar of Strength" award, deployed to BharatPe</p>
                </div>
                <div>
                    <h3 style={styles.sectionH3}>MERN Stack Intern - PrepBytes</h3>
                    <p style={styles.sectionP}>Nov 2021 - Aug 2022 | Remote</p>
                    <p style={styles.sectionP}>Built multiple React-based projects including news app and UI-focused tools</p>
                </div>
            </motion.section>

            <motion.section
                style={styles.section}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 style={styles.sectionH2}>Skills</h2>
                <ul style={styles.skillsList}>
                    {skills.map((skill, index) => (
                        <li key={index} style={styles.skillItem}>{skill}</li>
                    ))}
                </ul>
            </motion.section>

            <motion.section
                style={styles.section}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 style={styles.sectionH2}>Projects</h2>
                <ul style={{ ...styles.skillsList, gridTemplateColumns: '1fr' }}>
                    {projects.map((project, index) => (
                        <li key={index} style={{ ...styles.skillItem, textAlign: 'left' }}>{project}</li>
                    ))}
                </ul>
            </motion.section>

            <motion.section
                style={styles.section}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 style={{ ...styles.sectionH2, marginBottom: '10px' }}>Education</h2>
                <p style={styles.sectionP}>Bachelor of Science - BSc</p>
                <p style={styles.sectionP}>Rashtrasant Tukadoji Maharaj Nagpur University, 2022</p>
            </motion.section>
        </div>
    );
}
