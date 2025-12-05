import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    degree: "MBA (IT Management)",
    institution: "Lovely Professional University",
    period: "2024 – Present",
    score: "Ongoing",
  },
  {
    degree: "Bachelor of Arts",
    institution: "IGNOU",
    period: "2018 – 2021",
    score: "65%",
  },
  {
    degree: "Intermediate",
    institution: "Haryana Public School",
    period: "2017 – 2018",
    score: "70%",
  },
  {
    degree: "Matriculation",
    institution: "City Public High School",
    period: "2015 – 2016",
    score: "72%",
  },
];

const languages = [
  { name: "Hindi", level: "Full Professional Proficiency" },
  { name: "English", level: "Full Professional Proficiency" },
  { name: "Punjabi", level: "Full Professional Proficiency" },
];

const EducationSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-gradient">Education</span>
            </h2>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gradient-card p-5 rounded-xl border border-border shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={20} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <p className="text-sm text-primary">{edu.institution}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {edu.period}
                        </span>
                        <span className="bg-muted px-2 py-0.5 rounded">{edu.score}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-gradient">Languages</span>
            </h2>

            <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card">
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-foreground font-medium">{lang.name}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-card p-5 rounded-xl border border-border shadow-card text-center">
                <div className="text-3xl font-bold text-gradient mb-1">4+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-gradient-card p-5 rounded-xl border border-border shadow-card text-center">
                <div className="text-3xl font-bold text-gradient mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
