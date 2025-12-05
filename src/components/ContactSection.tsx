import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out for collaborations or just a friendly chat.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Email Card */}
            <a
              href="mailto:sandeepthapan429@gmail.com"
              className="group bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Mail className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground break-all">sandeepthapan429@gmail.com</p>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+919728231429"
              className="group bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Phone className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">+91 9728231429</p>
            </a>

            {/* Location Card */}
            <div className="group bg-gradient-card p-6 rounded-xl border border-border shadow-card text-center">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">Fatehabad, India</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to start your next project?
            </p>
            <a
              href="mailto:sandeepthapan429@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity glow-primary"
            >
              <Send size={18} />
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
