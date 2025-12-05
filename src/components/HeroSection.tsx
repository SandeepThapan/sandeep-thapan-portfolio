import { ArrowDown, Mail, Phone, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-hero overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

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

          {/* Title */}
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Full Stack Developer with <span className="text-primary font-semibold">4+ Years</span> Experience
          </h2>

          {/* Summary */}
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Designing, developing, and deploying scalable web applications with expertise in 
            .NET Core, React.js, and modern frontend technologies. Building CRM systems, 
            ERP modules, and advanced calculation engines.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <a href="mailto:sandeepthapan429@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail size={18} />
              <span className="text-sm">sandeepthapan429@gmail.com</span>
            </a>
            <a href="tel:+919728231429" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone size={18} />
              <span className="text-sm">+91 9728231429</span>
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={18} />
              <span className="text-sm">Fatehabad, India</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity glow-primary"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors"
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
