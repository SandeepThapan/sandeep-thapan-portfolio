import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Anthem Infotech",
    location: "Zirakpur",
    role: "Full Stack Developer",
    period: "Feb 2023 – Present",
    highlights: [
      "Built CRM, ERP, and automation apps using React.js, .NET Web API, SQL Server",
      "Developed loan & EMI calculation engines with advanced rules",
      "Integrated PDF report generation using iTextSharp",
      "Created dashboards, workflows, and multi-client features",
      "Optimized SQL queries improving system performance",
    ],
  },
  {
    company: "KMA Technoware",
    location: "Hisar",
    role: "Full Stack Developer",
    period: "Aug 2021 – Dec 2023",
    highlights: [
      "Designed and developed multiple web applications using React.js, .NET Core, MS-SQL",
      "Built admin panels, CRM modules, and reporting systems",
      "Developed mobile UI components using React Native",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building enterprise-grade applications and leading development initiatives
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 pb-12 last:pb-0">
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-border" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-1 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center glow-primary">
                <Briefcase size={12} className="text-primary-foreground" />
              </div>

              {/* Content */}
              <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card ml-4">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}, {exp.location}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm bg-muted px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
