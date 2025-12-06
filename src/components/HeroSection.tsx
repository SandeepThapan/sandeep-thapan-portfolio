import { ArrowDown, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { useTypingEffect } from "@/hooks/use-typing-effect";

const HeroSection = () => {
  const typedText = useTypingEffect([
    "Full Stack Developer",
    ".NET Core Expert",
    "React.js Specialist",
    "CRM & ERP Builder"
  ], 100, 50, 2000);

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-hero overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p className="text-primary font-medium mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-foreground">Sandeep </span>
            <span className="text-gradient">Thapan</span>
          </h1>

          {/* Dynamic Title with Typing Effect */}
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up min-h-[2rem]" style={{ animationDelay: "0.3s" }}>
            <span className="text-primary font-semibold">{typedText}</span>
            <span className="animate-pulse">|</span>
          </h2>

          {/* Experience Badge */}
          <div className="inline-block mb-8 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-medium">
              4+ Years Experience
            </span>
          </div>

          {/* Summary */}
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Designing, developing, and deploying scalable web applications with expertise in 
            .NET Core, React.js, and modern frontend technologies. Building CRM systems, 
            ERP modules, and advanced calculation engines.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <a href="mailto:sandeepthapan429@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all hover:scale-105">
              <Mail size={18} />
              <span className="text-sm">sandeepthapan429@gmail.com</span>
            </a>
            <a href="tel:+919728231429" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all hover:scale-105">
              <Phone size={18} />
              <span className="text-sm">+91 9728231429</span>
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={18} />
              <span className="text-sm">Fatehabad, India</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
            <a href="https://github.com/sandeepthapan" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/sandeepthapan" target="_blank" rel="noopener noreferrer"
               className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all hover:scale-110">
              <Linkedin size={20} />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-all glow-primary"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary hover:scale-105 transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
