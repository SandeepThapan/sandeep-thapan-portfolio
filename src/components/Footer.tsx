import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer     className="py-12 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>    
              <h3 className="text-xl font-bold text-gradient mb-3">Sandeep Thapan</h3>
              <p className="text-sm text-muted-foreground">
                Full Stack Developer specializing in .NET Core, React.js, and enterprise applications.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <a href="#skills" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
                <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Connect</h4>
              <div className="flex gap-3">
                <a href="https://github.com/sandeepthapan" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com/in/sandeepthapan" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:sandeepthapan429@gmail.com"
                   className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-border hover:border-primary hover:bg-primary/10 transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Sandeep Thapan. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Built with <Heart size={14} className="text-primary fill-primary" /> using React & TypeScript
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
