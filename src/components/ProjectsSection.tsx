import { Code } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const projects = [
  {
    title: "Fintrack CRM",
    period: "2024 – Present",
    description: "Comprehensive CRM system with lead management, property ERP, and automated workflows",
    features: [
      "Automated lead routing & scoring",
      "Property & contract management",
      "EMI calculation engines",
      "PDF generation & email automation",
    ],
    tech: ["React.js", ".NET Web API", "MS-SQL", "iTextSharp"],
  },
  {
    title: "E-Controls ERP",
    period: "2023 – Present",
    description: "Enterprise ERP system with automated workflows and comprehensive reporting",
    features: [
      "Automated email workflows",
      "Advanced reporting system",
      "Frontend migration to React.js",
      "Backend migration to .NET Core",
    ],
    tech: ["React.js", ".NET Core", "MS-SQL"],
  },
  {
    title: "Sip HBSE Project",
    period: "2022",
    description: "Admin panel for school and college information management system",
    features: [
      "Student information management",
      "College database management",
      "Full admin panel functionality",
    ],
    tech: ["React.js", ".NET Core", "MS-SQL"],
  },
  {
    title: "Swapdeal E-Commerce",
    period: "2021",
    description: "Complete e-commerce website with admin panel for product and order management",
    features: [
      "Product catalog management",
      "Order processing system",
      "Admin dashboard",
    ],
    tech: ["React.js", ".NET Web API", "MS-SQL"],
  },
  {
    title: "Gramin Shiksha App",
    period: "2021",
    description: "Mobile application for educational content delivery",
    features: [
      "Mobile UI development",
      "Feature screens implementation",
      "Cross-platform compatibility",
    ],
    tech: ["React Native"],
  },
  {
    title: "Admission Mantra CRM",
    period: "2021",
    description: "CRM system for managing student admission inquiries",
    features: [
      "Inquiry management",
      "Student tracking",
      "Admission workflow automation",
    ],
    tech: ["React.js", ".NET Core", "MS-SQL"],
  },
];

const ProjectsSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of enterprise applications and systems I've built and contributed to
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.2)] transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <Code className="text-primary" size={24} />
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {project.period}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>

              <ul className="space-y-1 mb-4">
                {project.features.map((feature, fIndex) => (
                  <li key={fIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">→</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
