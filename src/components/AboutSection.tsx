import { Code2, Database, Layers, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "End-to-end application development from frontend to backend",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description: "Designing and optimizing MS-SQL and MySQL databases",
  },
  {
    icon: Layers,
    title: "CRM & ERP Systems",
    description: "Building enterprise-grade business management solutions",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "SQL query optimization and application performance tuning",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a passionate Full Stack Developer with over 4 years of experience in designing, 
                developing, and deploying scalable web applications. My expertise spans across 
                .NET Core, Web API, MS-SQL, React.js, and modern frontend technologies.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I specialize in building CRM systems, ERP modules, automation tools, and advanced 
                calculation engines. My focus is on creating efficient, maintainable code that 
                delivers real business value.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing my MBA in IT Management at Lovely Professional University 
                while working as a Full Stack Developer at Anthem Infotech.
              </p>
            </div>

            {/* Right - Highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-card p-5 rounded-xl border border-border shadow-card hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mb-3">
                    <item.icon size={20} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
