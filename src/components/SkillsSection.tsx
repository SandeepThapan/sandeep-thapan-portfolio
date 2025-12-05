const skills = {
  backend: [
    { name: ".NET Core", level: 95 },
    { name: "C#", level: 95 },
    { name: ".NET Web API", level: 90 },
    { name: "MVC", level: 85 },
    { name: "Entity Framework", level: 88 },
    { name: "LINQ", level: 90 },
  ],
  frontend: [
    { name: "React.js", level: 90 },
    { name: "JavaScript", level: 88 },
    { name: "HTML/CSS", level: 92 },
    { name: "React Native", level: 75 },
  ],
  database: [
    { name: "MS-SQL", level: 90 },
    { name: "MySQL", level: 85 },
  ],
  tools: [
    { name: "Git", level: 88 },
    { name: "iTextSharp", level: 80 },
  ],
};

const SkillCategory = ({ title, items }: { title: string; items: { name: string; level: number }[] }) => (
  <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card">
    <h3 className="text-lg font-semibold text-primary mb-4">{title}</h3>
    <div className="space-y-4">
      {items.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-foreground">{skill.name}</span>
            <span className="text-xs text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across the full stack, from backend architecture to frontend development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <SkillCategory title="Backend" items={skills.backend} />
          <SkillCategory title="Frontend" items={skills.frontend} />
          <SkillCategory title="Database" items={skills.database} />
          <SkillCategory title="Tools" items={skills.tools} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
