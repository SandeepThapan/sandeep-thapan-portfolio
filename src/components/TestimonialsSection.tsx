import { Quote, Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const testimonials = [
  {
    name: "Client Name",
    role: "CEO, Tech Company",
    content: "Sandeep delivered exceptional work on our CRM system. His expertise in .NET Core and React.js helped us build a scalable solution that exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Project Manager",
    role: "Anthem Infotech",
    content: "Outstanding developer with strong problem-solving skills. Sandeep's ability to handle complex ERP modules and deliver quality code on time is remarkable.",
    rating: 5,
  },
  {
    name: "Team Lead",
    role: "Development Team",
    content: "Working with Sandeep has been a great experience. His knowledge of full-stack development and attention to detail make him a valuable team member.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section id="testimonials" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="text-primary mb-4" size={32} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
