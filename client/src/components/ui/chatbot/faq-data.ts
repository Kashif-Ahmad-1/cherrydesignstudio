// Sample FAQ data with questions and answers for the chatbot
// This is a collection of over 100 common questions related to web design services

// Type for FAQ item
export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

// Array of FAQs
export const faqData: FAQItem[] = [
  // About the company
  {
    question: "What is Cherry.design?",
    answer: "Cherry.design is a premium web design agency specializing in creating cutting-edge, maximalist designs with bold typography, vibrant colors, and interactive elements. We focus on delivering high-impact digital experiences that stand out in today's crowded digital landscape.",
    keywords: ["cherry", "company", "about", "what is", "who are you"]
  },
  {
    question: "How long has Cherry.design been in business?",
    answer: "Cherry.design was founded in 2018 and has been creating exceptional digital experiences for clients worldwide for over 6 years. During this time, we've built a reputation for innovative, boundary-pushing designs and exceptional client service.",
    keywords: ["founded", "started", "history", "long", "years", "business"]
  },
  {
    question: "Where is Cherry.design located?",
    answer: "Our headquarters are in New York City, but we operate globally with satellite offices in London, Tokyo, and Berlin. Our team works remotely across several time zones, allowing us to serve clients worldwide with 24/7 availability.",
    keywords: ["location", "office", "where", "address", "headquarter"]
  },
  {
    question: "How many people work at Cherry.design?",
    answer: "Cherry.design currently employs a team of 35 talented professionals, including designers, developers, UX specialists, project managers, and client success representatives. Our team size allows us to be agile while still handling large-scale projects efficiently.",
    keywords: ["team", "employees", "staff", "people", "work", "size"]
  },
  {
    question: "What makes Cherry.design different from other agencies?",
    answer: "Cherry.design stands out through our focus on maximalist design principles, our technical expertise in cutting-edge technologies, and our results-driven approach. We're known for our bold visual aesthetics, immersive interactive experiences, and our commitment to pushing creative boundaries while delivering measurable business results.",
    keywords: ["different", "unique", "special", "better", "competitors", "stand out"]
  },

  // Services
  {
    question: "What services does Cherry.design offer?",
    answer: "Cherry.design offers a comprehensive range of digital services, including website design and development, branding and identity design, UI/UX design, e-commerce solutions, custom web applications, interactive experiences, 3D design, motion graphics, and digital marketing strategy. Each service is tailored to your specific business goals and brand identity.",
    keywords: ["services", "offer", "provide", "what do you do"]
  },
  {
    question: "Do you design mobile apps?",
    answer: "Yes, Cherry.design specializes in creating stunning, user-friendly mobile applications for both iOS and Android platforms. Our app design process includes UX research, wireframing, prototyping, visual design, testing, and coordination with development teams for smooth implementation.",
    keywords: ["mobile", "app", "application", "ios", "android"]
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Absolutely! Website redesigns are one of our core services. We'll analyze your current site, identify improvement opportunities, and transform it into a more effective, visually impressive, and user-friendly platform while maintaining your brand identity and improving conversion rates.",
    keywords: ["redesign", "update", "revamp", "existing", "current", "makeover"]
  },
  {
    question: "Do you offer website maintenance services?",
    answer: "Yes, we offer comprehensive website maintenance packages to keep your site secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security monitoring, performance optimization, content updates, backup management, and technical support.",
    keywords: ["maintenance", "upkeep", "updates", "support", "manage"]
  },
  {
    question: "Can you help with branding and logo design?",
    answer: "Definitely! Cherry.design provides complete branding services, including logo design, brand identity systems, style guides, brand messaging, and visual asset creation. We develop unique, memorable brands that resonate with your target audience and stand out in your industry.",
    keywords: ["branding", "logo", "identity", "brand"]
  },
  {
    question: "Do you offer e-commerce solutions?",
    answer: "Yes, we create custom e-commerce solutions that drive sales and provide exceptional shopping experiences. Our e-commerce services include platform selection (Shopify, WooCommerce, Magento, etc.), custom design, product showcasing, payment integration, inventory management systems, and optimization for conversions.",
    keywords: ["ecommerce", "e-commerce", "shop", "store", "selling", "online store"]
  },
  {
    question: "Can you create custom animations and interactive elements?",
    answer: "Absolutely! Interactive elements and custom animations are our specialty. We create engaging micro-interactions, scroll-triggered animations, 3D elements, interactive infographics, and immersive experiences that captivate users and enhance your brand's storytelling capabilities.",
    keywords: ["animation", "interactive", "motion", "moving", "effects"]
  },
  {
    question: "Do you offer content creation services?",
    answer: "Yes, our content creation services include copywriting, photography direction, illustration, iconography, video production, and 3D asset creation. We ensure all content aligns with your brand voice and effectively communicates your message to your target audience.",
    keywords: ["content", "writing", "copy", "text", "photos", "videos"]
  },
  {
    question: "Can you help with SEO and digital marketing?",
    answer: "Yes, we offer SEO optimization and digital marketing services to increase your online visibility and drive qualified traffic. Our services include keyword research, on-page SEO, technical SEO, content strategy, analytics setup, conversion rate optimization, and digital marketing campaign planning.",
    keywords: ["seo", "marketing", "traffic", "google", "search engine", "ranking"]
  },
  {
    question: "Do you provide website hosting?",
    answer: "While we don't directly host websites, we work with premium hosting partners to ensure your website has fast, secure, and reliable hosting. We handle all the technical setup, configuration, and deployment, making the process hassle-free for you.",
    keywords: ["hosting", "host", "server", "domain"]
  },

  // Process & Project Management
  {
    question: "What is your design process like?",
    answer: "Our design process consists of 7 key phases: Discovery (understanding your goals and requirements), Research (competitive analysis and user research), Strategy (planning the project approach), Design (creating the visual and interactive elements), Development (building the functional product), Testing (ensuring quality and usability), and Launch (deploying and monitoring). Throughout this process, we maintain clear communication and collaborative feedback loops.",
    keywords: ["process", "steps", "how", "work", "procedure", "approach"]
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A standard website typically takes 6-12 weeks from concept to launch. Smaller projects like landing pages might take 3-4 weeks, while complex e-commerce sites or web applications can take 3-6 months. During our initial consultation, we'll provide a detailed timeline specific to your project needs.",
    keywords: ["time", "timeline", "duration", "long", "weeks", "months"]
  },
  {
    question: "How do you handle project management?",
    answer: "We use a streamlined project management approach combining Agile and traditional methodologies. Each project has a dedicated project manager who serves as your main point of contact. We use collaborative tools like Figma, Slack, and Asana to ensure transparent communication, regular updates, and efficient feedback incorporation.",
    keywords: ["management", "manage", "process", "track", "progress"]
  },
  {
    question: "Will I be able to make edits to my website after it launches?",
    answer: "Yes, we provide a user-friendly content management system (CMS) that allows you to easily update content, add new pages, and make basic changes to your website. We also offer training sessions to ensure you're comfortable managing your site. For more complex changes, our support team is always available to assist.",
    keywords: ["edit", "update", "change", "modify", "cms", "content"]
  },
  {
    question: "How do you handle feedback and revisions?",
    answer: "Feedback and revisions are a natural part of our collaborative process. We typically include 2-3 rounds of revisions in each project phase. We use visual feedback tools that allow you to comment directly on designs, making the revision process clear and efficient. Additional revision rounds can be accommodated if needed.",
    keywords: ["feedback", "revisions", "changes", "iterations", "rounds"]
  },
  {
    question: "Do I need to provide content for my website?",
    answer: "You can either provide your own content or utilize our content creation services. If you provide content, we'll need it during the design phase. If you need assistance, our copywriters and content strategists can develop engaging, SEO-optimized content that aligns with your brand voice and effectively communicates your message.",
    keywords: ["content", "text", "images", "provide", "write"]
  },
  {
    question: "How do you ensure websites are secure?",
    answer: "Security is paramount in all our projects. We implement industry best practices including SSL certificates, secure code practices, regular updates, firewall protection, and secure authentication systems. For e-commerce sites, we ensure PCI compliance and implement additional security layers for handling sensitive information.",
    keywords: ["security", "secure", "protection", "safe", "hack", "breach"]
  },
  {
    question: "Do you build websites that I can update myself?",
    answer: "Absolutely! We build websites on user-friendly content management systems (CMS) like WordPress, Webflow, or custom solutions that allow you to easily update content, add pages, and manage media. We provide training and documentation so you can confidently manage your website after launch.",
    keywords: ["update", "edit", "manage", "myself", "cms", "content management"]
  },

  // Technology & Technical
  {
    question: "What technologies do you use for website development?",
    answer: "We use modern, cutting-edge technologies including HTML5, CSS3, JavaScript (React, Vue.js, or Next.js), PHP, Node.js, and Python. For content management, we work with WordPress, Webflow, Shopify, and headless CMS solutions. Our technology choices depend on your specific requirements, prioritizing performance, security, and scalability.",
    keywords: ["technology", "tech", "stack", "development", "coding", "programming"]
  },
  {
    question: "Are your websites mobile responsive?",
    answer: "Yes, all our websites are fully responsive and optimized for all devices and screen sizes. We follow a mobile-first approach to ensure excellent performance on smartphones and tablets, while still delivering impressive experiences on desktop. We rigorously test on multiple devices to guarantee consistent functionality and appearance.",
    keywords: ["responsive", "mobile", "phone", "tablet", "device", "screen size"]
  },
  {
    question: "Can you integrate with third-party services and APIs?",
    answer: "Absolutely! We regularly integrate websites and applications with various third-party services and APIs including payment gateways, CRM systems, marketing automation tools, social media platforms, analytics services, and more. These integrations help streamline your operations and enhance functionality.",
    keywords: ["integrate", "integration", "api", "third-party", "connect"]
  },
  {
    question: "How do you ensure website accessibility?",
    answer: "We're committed to creating accessible websites that comply with WCAG guidelines. Our accessibility measures include semantic HTML, proper contrast ratios, keyboard navigation, screen reader compatibility, alt text for images, accessible forms, and ARIA attributes where necessary. We test with accessibility tools and can provide compliance documentation.",
    keywords: ["accessibility", "accessible", "ada", "wcag", "disability"]
  },
  {
    question: "How fast will my website be?",
    answer: "Performance is a top priority in our development process. We implement best practices for speed optimization including image compression, code minification, lazy loading, browser caching, and CDN implementation. Our websites typically score 90+ on Google PageSpeed Insights. We also provide performance reports and continuous optimization recommendations.",
    keywords: ["speed", "fast", "performance", "load", "pagespeed", "slow"]
  },
  {
    question: "Do you work with specific content management systems (CMS)?",
    answer: "We work with various content management systems based on your needs. Our team has expertise in WordPress, Webflow, Shopify, Drupal, and headless CMS options like Contentful and Sanity. We recommend the best CMS for your specific requirements, considering factors like content complexity, update frequency, and team capabilities.",
    keywords: ["cms", "content management", "wordpress", "webflow", "shopify"]
  },
  {
    question: "Can you help migrate my existing website to a new platform?",
    answer: "Yes, we specialize in website migrations between different platforms and CMS systems. Our migration process includes thorough content inventory, data mapping, custom migration scripts, design adaptation, URL structure preservation, SEO considerations, testing, and performance optimization on the new platform.",
    keywords: ["migration", "migrate", "move", "transfer", "platform", "change"]
  },
  {
    question: "How do you handle website hosting and deployment?",
    answer: "While we don't directly provide hosting, we help you select the optimal hosting solution based on your website's needs and budget. We handle all aspects of deployment including server configuration, file transfers, database setup, DNS management, SSL certificate installation, and post-launch monitoring to ensure everything runs smoothly.",
    keywords: ["hosting", "servers", "deployment", "launch", "live"]
  },

  // Pricing & Payments
  {
    question: "How much does a website cost?",
    answer: "Our website projects typically range from $8,000 for basic sites to $50,000+ for complex e-commerce platforms or custom web applications. Pricing depends on factors like design complexity, functionality requirements, content needs, and timeline. We provide detailed, transparent quotes after understanding your specific project requirements.",
    keywords: ["cost", "price", "pricing", "expensive", "budget", "money"]
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment schedules. Typically, we require a 50% deposit to begin work, with the remaining balance due at project completion. For larger projects, we can arrange milestone-based payments (e.g., 30% upfront, 30% at design approval, 30% at development completion, 10% at launch). We can discuss payment terms that work for your budget constraints.",
    keywords: ["payment", "plan", "installment", "pay", "deposit"]
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit cards, bank transfers, PayPal, and for certain regions, digital payment services like Stripe and Square. For international clients, we can accommodate wire transfers in multiple currencies. We provide proper invoices for all transactions.",
    keywords: ["payment", "method", "credit card", "pay", "bank", "transfer"]
  },
  {
    question: "Do you charge for maintenance and updates?",
    answer: "Yes, we offer monthly maintenance packages starting at $150/month for basic monitoring and updates, scaling up to $1,000+/month for comprehensive management services. Alternatively, we can provide ad-hoc support at our standard hourly rate of $150-200/hour. We'll recommend the best option based on your anticipated needs.",
    keywords: ["maintenance", "cost", "fee", "monthly", "update", "charge"]
  },
  {
    question: "Is there an additional cost for mobile optimization?",
    answer: "No, mobile responsiveness is included in all our website packages. We follow a mobile-first approach to ensure your site works perfectly across all devices. There's no additional charge for this essential aspect of modern web design.",
    keywords: ["mobile", "cost", "extra", "responsive", "additional"]
  },
  {
    question: "Do you offer any discounts?",
    answer: "We occasionally offer special rates for non-profits, educational institutions, and startups. We also provide discounts for long-term maintenance contracts or when booking multiple services. Feel free to ask about any current promotions or discounts that might apply to your project.",
    keywords: ["discount", "deal", "cheaper", "offer", "lower", "price cut"]
  },

  // Working Together
  {
    question: "How do we get started working together?",
    answer: "The process begins with a discovery call to understand your goals and requirements. Next, we'll provide a detailed proposal and quote. Once approved, we'll send a contract and collect the initial deposit to secure your spot in our schedule. We'll then kick off with a comprehensive strategy session to align on project details and timelines.",
    keywords: ["start", "begin", "process", "first", "step"]
  },
  {
    question: "What information do you need from me to start a project?",
    answer: "To get started, we'll need your business information, project goals, target audience details, brand assets (logo, colors, fonts if available), content (or content needs), examples of sites you like, technical requirements, timeline expectations, and budget parameters. Don't worry if you don't have everything ready – we can guide you through collecting this information.",
    keywords: ["information", "need", "require", "start", "provide"]
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, we're happy to sign Non-Disclosure Agreements before discussing sensitive project details. Client confidentiality is extremely important to us, and we have standard NDAs ready or can work with your documents if preferred.",
    keywords: ["nda", "confidential", "disclosure", "secret", "privacy", "agreement"]
  },
  {
    question: "Can I see your portfolio?",
    answer: "Certainly! You can view our portfolio on our website under the Projects section. We also have case studies that provide deeper insights into our process and results. If you're interested in seeing projects similar to what you have in mind, we can prepare a custom portfolio presentation for you.",
    keywords: ["portfolio", "work", "examples", "projects", "past", "clients"]
  },
  {
    question: "Who owns the website after it's completed?",
    answer: "You do! Once the project is completed and final payment is made, you own all rights to the custom work we've created for you. We provide all necessary files, access credentials, and documentation. The only exceptions might be third-party elements like stock photos or licensed fonts, which we'll clearly document.",
    keywords: ["own", "ownership", "rights", "copyright", "intellectual property"]
  },
  {
    question: "Do you have experience in my industry?",
    answer: "We've worked with clients across diverse industries including technology, healthcare, fashion, education, finance, hospitality, real estate, and non-profits. While we may have experience in your specific industry, our approach involves thorough research to understand your unique market dynamics, competition, and audience needs regardless of industry.",
    keywords: ["industry", "experience", "sector", "market", "similar", "specialized"]
  },
  {
    question: "Can we meet in person?",
    answer: "If you're near one of our office locations (New York, London, Tokyo, or Berlin), we'd be happy to arrange an in-person meeting. For clients in other locations, we typically work remotely using video conferencing and collaborative tools, which has proven highly effective. We ensure the same level of service and communication regardless of meeting format.",
    keywords: ["meet", "person", "face", "office", "visit"]
  },
  {
    question: "What happens if I'm not satisfied with the design?",
    answer: "Client satisfaction is our priority. If you're not happy with the initial designs, we'll discuss your concerns in detail and make revisions based on your feedback. Our process includes multiple revision rounds to ensure we align with your vision. In the rare case where we can't meet expectations, our contract includes fair terms for project conclusion.",
    keywords: ["satisfied", "happy", "like", "unhappy", "disappointed"]
  },

  // Technical Support & Ongoing Services
  {
    question: "What kind of support do you offer after the website launches?",
    answer: "After launch, we provide 30 days of complimentary support to address any issues. Beyond that, we offer various maintenance packages for ongoing support, including regular updates, security monitoring, performance optimization, content updates, and technical troubleshooting. We also provide detailed documentation and training to empower your team.",
    keywords: ["support", "after", "launch", "help", "assistance"]
  },
  {
    question: "How quickly do you respond to support requests?",
    answer: "For clients on maintenance plans, we respond to standard support requests within 24 hours (often much faster during business hours) and address critical issues like site outages within 4 hours. Emergency support is available 24/7 for our premium maintenance clients. Response times are documented in our Service Level Agreements.",
    keywords: ["respond", "response", "time", "quick", "emergency", "urgent"]
  },
  {
    question: "Do you provide training on how to use my website?",
    answer: "Yes, we provide comprehensive training tailored to your team's technical proficiency. This typically includes live training sessions (recorded for future reference), customized documentation, and a knowledge base of common tasks. Additional training sessions can be arranged as needed when new team members join or for advanced features.",
    keywords: ["training", "learn", "tutorial", "teach", "how to", "use"]
  },
  {
    question: "Can you help if my website crashes or has problems?",
    answer: "Absolutely! Even if we didn't build your site originally, our technical team can diagnose and fix website problems including crashes, errors, hacking incidents, or performance issues. We offer emergency support services and can quickly intervene to get your site back online with minimal disruption.",
    keywords: ["crash", "problem", "down", "error", "fix", "broken"]
  },
  {
    question: "Do you offer website audits?",
    answer: "Yes, we provide comprehensive website audits that analyze design, user experience, performance, SEO, accessibility, security, and conversion optimization. Our audit reports include detailed findings and prioritized recommendations for improvements. This service can be booked as a standalone offering or as part of an ongoing optimization strategy.",
    keywords: ["audit", "analysis", "review", "assessment", "evaluate"]
  },

  // E-commerce Specific
  {
    question: "Can you build an online store for my business?",
    answer: "Yes, we specialize in creating custom e-commerce solutions that drive sales and provide exceptional shopping experiences. Depending on your needs, we can build your store on platforms like Shopify, WooCommerce, Magento, or custom solutions. We handle everything from design to product setup, payment processing, and inventory management.",
    keywords: ["store", "shop", "ecommerce", "sell", "products", "online store"]
  },
  {
    question: "Which e-commerce platforms do you work with?",
    answer: "We work with all major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and Squarespace Commerce. We also build headless commerce solutions using frameworks like Next.js connected to commerce APIs. We'll recommend the best platform based on your specific requirements, budget, and growth plans.",
    keywords: ["ecommerce", "platform", "shopify", "woocommerce", "magento"]
  },
  {
    question: "Can you migrate my store from one platform to another?",
    answer: "Yes, we specialize in e-commerce migrations between platforms. Our process ensures all products, categories, customer accounts, order history, and content are transferred correctly. We carefully plan redirects to maintain SEO value and ensure a seamless transition with minimal disruption to your business.",
    keywords: ["migrate", "migration", "transfer", "move", "switch", "platform"]
  },
  {
    question: "Do you integrate with payment gateways?",
    answer: "Yes, we integrate with all major payment gateways including Stripe, PayPal, Square, Authorize.net, Braintree, and region-specific options. We ensure secure checkout processes, proper transaction handling, and compliance with payment security standards.",
    keywords: ["payment", "gateway", "credit card", "stripe", "paypal", "checkout"]
  },
  {
    question: "Can you set up shipping and tax calculations?",
    answer: "Absolutely! We configure shipping rules based on your logistics requirements, including real-time carrier rates, flat rates, free shipping thresholds, and international shipping options. We also set up tax calculations according to your business locations and applicable tax laws, ensuring compliance with local regulations.",
    keywords: ["shipping", "tax", "calculation", "rates", "delivery"]
  },

  // SEO & Marketing
  {
    question: "Do you provide SEO services?",
    answer: "Yes, we offer comprehensive SEO services including technical SEO, on-page optimization, content strategy, keyword research, competitor analysis, local SEO, and performance monitoring. Our SEO approach focuses on sustainable, long-term results through quality content and technical excellence rather than shortcuts or questionable tactics.",
    keywords: ["seo", "search engine", "ranking", "google", "optimization"]
  },
  {
    question: "Will my website be optimized for search engines?",
    answer: "Yes, all our websites are built with SEO best practices in mind. This includes proper HTML structure, optimized page load speeds, mobile responsiveness, secure HTTPS implementation, schema markup, and SEO-friendly URLs. We also provide guidance on content optimization to help improve your search visibility.",
    keywords: ["seo", "optimize", "search", "google", "rank"]
  },
  {
    question: "Can you help with content marketing?",
    answer: "Yes, we provide content marketing services including strategy development, editorial planning, content creation (blog posts, articles, videos, infographics), and content distribution. Our content marketing approach focuses on creating valuable, relevant content that attracts and engages your target audience while supporting your SEO and business goals.",
    keywords: ["content", "marketing", "blog", "articles", "strategy"]
  },
  {
    question: "Do you handle social media marketing?",
    answer: "Yes, we offer social media marketing services including platform strategy, content creation, posting schedules, community management, paid social campaigns, and performance analytics. We identify the most relevant platforms for your audience and create engaging content that builds your brand presence and drives engagement.",
    keywords: ["social", "media", "facebook", "instagram", "twitter", "linkedin"]
  },
  {
    question: "Can you set up Google Analytics on my website?",
    answer: "Absolutely! We set up and configure Google Analytics (including Google Analytics 4) to track your website's performance. This includes custom dashboards, goal tracking, event tracking, e-commerce tracking if applicable, and integration with Google Search Console. We can also provide training on how to interpret the data for business insights.",
    keywords: ["analytics", "google", "tracking", "statistics", "data", "metrics"]
  },

  // Website Features
  {
    question: "Can you add a blog to my website?",
    answer: "Yes, we can integrate a fully-featured blog into your website. Our blog implementations include category organization, tagging systems, author profiles, comment functionality (if desired), social sharing, related posts, and subscriber management. We ensure your blog is both visually cohesive with your site and easy to update.",
    keywords: ["blog", "articles", "news", "posts"]
  },
  {
    question: "Can you build a membership or login area?",
    answer: "Yes, we create secure membership areas and user account systems with features like registration, login/logout, password recovery, user profiles, members-only content, and different permission levels. For e-commerce sites, we can develop customer accounts with order history, saved addresses, and wishlist functionality.",
    keywords: ["membership", "login", "members", "account", "registration", "users"]
  },
  {
    question: "Can you add forms to my website?",
    answer: "Absolutely! We design and implement various form types including contact forms, quote requests, job applications, surveys, event registrations, and more. All forms include validation, spam protection, customizable notifications, and data storage or CRM integration as needed.",
    keywords: ["form", "contact", "submission", "input", "field"]
  },
  {
    question: "Can you integrate a booking or appointment system?",
    answer: "Yes, we integrate sophisticated booking and appointment systems that allow customers to check availability and schedule appointments online. These systems include calendar synchronization, automated reminders, payment processing if required, and administrative tools for managing bookings.",
    keywords: ["booking", "appointment", "schedule", "calendar", "reservation"]
  },
  {
    question: "Can you create multi-language websites?",
    answer: "Yes, we design and develop multilingual websites using best practices for language switching, content management, and SEO. We implement proper language indicators, ensure consistent layout across languages, and can work with translation services or your own translated content to create a seamless multilingual experience.",
    keywords: ["language", "multilingual", "translation", "international", "localization"]
  },

  // Technical SEO
  {
    question: "What is your approach to technical SEO?",
    answer: "Our technical SEO approach focuses on creating a solid foundation for search visibility. This includes implementing proper site architecture, creating XML sitemaps, optimizing robots.txt, ensuring proper canonical tags, implementing structured data/schema markup, optimizing page speed, ensuring mobile-friendliness, and fixing technical issues that could impact crawling or indexing.",
    keywords: ["technical", "seo", "structure", "crawling", "indexing"]
  },
  {
    question: "How do you handle website migrations without losing SEO?",
    answer: "Our SEO-focused migration process includes comprehensive URL mapping, proper 301 redirects implementation, preservation of existing metadata and content, careful handling of canonical tags and structured data, pre-launch testing, and post-migration monitoring. We work closely with search console tools to ensure proper indexing of the new site.",
    keywords: ["migration", "seo", "redirects", "ranking", "301"]
  },
  {
    question: "Can you help with local SEO?",
    answer: "Yes, we specialize in local SEO strategies including Google Business Profile optimization, local keyword targeting, location pages creation, local schema markup, citation building and management, review strategy, and local link building. These tactics improve visibility in local search results and map listings.",
    keywords: ["local", "seo", "google", "business", "maps", "listings"]
  },
  {
    question: "Do you implement schema markup?",
    answer: "Yes, we implement appropriate schema markup (structured data) to help search engines better understand your content. This includes organization, local business, product, FAQ, review, event, article, and breadcrumb schemas as relevant to your content. Proper schema can enhance SERP features like rich snippets, improving click-through rates.",
    keywords: ["schema", "structured", "data", "markup", "rich", "snippet"]
  },
  {
    question: "How do you approach mobile SEO?",
    answer: "Our mobile SEO approach ensures excellent performance on smartphones and tablets through responsive design, mobile-first indexing optimization, touch-friendly navigation, optimized page speed for mobile networks, properly sized content, and testing across multiple devices and screen sizes. We conduct mobile-specific usability testing to identify and address any issues.",
    keywords: ["mobile", "seo", "phone", "responsive", "speed"]
  },

  // Miscellaneous
  {
    question: "Can you work with our in-house team?",
    answer: "Absolutely! We frequently collaborate with in-house teams, adapting our involvement to complement your team's capabilities. This can range from providing specialized expertise (design, development, SEO) to managing specific project phases or offering strategic guidance. We establish clear communication and workflows to ensure productive collaboration.",
    keywords: ["team", "in-house", "collaborate", "internal", "staff"]
  },
  {
    question: "Do you work with clients internationally?",
    answer: "Yes, we work with clients worldwide! Our team is distributed across multiple time zones, allowing us to provide responsive service regardless of location. We use collaborative tools for efficient remote communication and can accommodate meeting times that work for your time zone.",
    keywords: ["international", "global", "overseas", "worldwide", "foreign"]
  },
  {
    question: "Can I update my website myself after it's built?",
    answer: "Yes, all our websites include a user-friendly content management system that allows you to update text, images, add new pages, blog posts, and manage common content elements. We provide training and documentation so you can confidently make changes. For more complex updates, our support team is always available.",
    keywords: ["update", "edit", "change", "myself", "content"]
  },
  {
    question: "How do you handle website accessibility?",
    answer: "We design with accessibility in mind, following WCAG guidelines. Our approach includes proper semantic HTML, keyboard navigation support, color contrast compliance, text alternatives for non-text content, ARIA attributes where needed, and compatibility with screen readers. We can provide varying levels of compliance based on your requirements.",
    keywords: ["accessibility", "ada", "wcag", "compliance", "disability"]
  },
  {
    question: "What is your privacy policy regarding client information?",
    answer: "We maintain strict confidentiality regarding all client information. Our privacy policy ensures that your business details, strategic plans, and proprietary information are never shared with third parties without explicit permission. We're happy to sign NDAs for additional legal protection of your information.",
    keywords: ["privacy", "confidential", "security", "information", "data"]
  },
  {
    question: "Can you create custom web applications?",
    answer: "Yes, we design and develop custom web applications tailored to specific business needs. Our application development services include requirements analysis, UX/UI design, front-end and back-end development, API integrations, database design, security implementation, testing, and deployment. We utilize modern frameworks and best practices for scalable, maintainable applications.",
    keywords: ["application", "app", "custom", "software", "webapp", "development"]
  },
  {
    question: "What technologies do you use for custom web applications?",
    answer: "For custom web applications, we primarily use React, Vue.js, or Angular for front-end development, paired with Node.js, Python/Django, or PHP/Laravel for back-end functionality. Database choices include PostgreSQL, MySQL, or MongoDB depending on requirements. We select the technology stack based on your specific needs, considering factors like performance requirements, scalability, and long-term maintenance.",
    keywords: ["technologies", "tech", "stack", "application", "framework", "development"]
  },
  {
    question: "Do you offer white-label services for agencies?",
    answer: "Yes, we provide white-label design and development services for agencies. This includes creating projects under your brand, communicating with your clients using your email addresses if needed, and providing deliverables that can be presented as your agency's work. We ensure complete confidentiality about our involvement.",
    keywords: ["white label", "agency", "reseller", "partner", "outsource"]
  },

  // Specific Add-ons/Features
  {
    question: "Can you integrate a live chat feature on my website?",
    answer: "Yes, we can integrate various live chat solutions including custom-developed chat systems, third-party platforms like Intercom, Drift, LiveChat, or Crisp, and AI-powered chatbots. We ensure the chat interface aligns with your site design and functions properly across all devices.",
    keywords: ["chat", "live", "support", "messaging", "talk"]
  },
  {
    question: "Can you add a search function to my website?",
    answer: "Yes, we implement robust search functionality tailored to your content needs. Options range from basic site search to advanced solutions with filters, autocomplete, and weighted results. For larger sites, we can integrate specialized search tools like Algolia or Elasticsearch for optimal performance and relevance.",
    keywords: ["search", "find", "lookup", "searchbar"]
  },
  {
    question: "Do you create custom dashboards or reporting tools?",
    answer: "Yes, we design and develop custom dashboards and reporting interfaces that visualize your important business data. These can include sales analytics, user behavior metrics, performance indicators, and other key data points specific to your business needs. We focus on creating intuitive, actionable dashboards that support informed decision-making.",
    keywords: ["dashboard", "reporting", "analytics", "metrics", "reports", "statistics"]
  },
  {
    question: "Can you add product filtering and search for e-commerce?",
    answer: "Absolutely! We implement advanced product filtering and search functionality for e-commerce sites, allowing customers to easily find products by categories, attributes, price ranges, ratings, and other relevant criteria. We focus on creating intuitive, fast filtering systems that enhance the shopping experience and increase conversion rates.",
    keywords: ["filter", "search", "product", "ecommerce", "find", "sorting"]
  },
  {
    question: "Can you implement user reviews and ratings?",
    answer: "Yes, we can implement comprehensive review and rating systems for products, services, or content. Features can include star ratings, written reviews, photo/video uploads, review moderation tools, review highlights, and structured data markup for rich snippets in search results.",
    keywords: ["reviews", "ratings", "testimonials", "stars", "feedback"]
  },
  {
    question: "Can you create a custom theme or template?",
    answer: "Yes, we specialize in creating custom themes and templates for various platforms including WordPress, Shopify, and other CMS systems. Our custom themes are built specifically for your brand, with unique layouts, custom functionality, and optimized performance – avoiding the limitations of off-the-shelf templates.",
    keywords: ["theme", "template", "custom", "wordpress", "shopify", "design"]
  },
  {
    question: "Can you help with website security?",
    answer: "Yes, we implement comprehensive security measures including SSL certificates, security plugins/tools, proper user permissions, secure coding practices, regular updates, firewall configuration, and malware scanning. We can also perform security audits on existing websites and implement improvements to protect against common vulnerabilities.",
    keywords: ["security", "secure", "hacking", "protection", "ssl", "https"]
  },

  // Add at least 20 more FAQ items to reach over 100 total
  {
    question: "What's the difference between a website redesign and a refresh?",
    answer: "A website refresh typically involves updating visual elements (colors, typography, images) and content while maintaining the existing structure and functionality. A redesign is more comprehensive, often including structural changes, new functionality, improved user experience, and sometimes migrating to a new platform or CMS. We can help determine which approach best suits your needs and budget.",
    keywords: ["redesign", "refresh", "update", "difference", "revamp"]
  },
  {
    question: "How often should I redesign my website?",
    answer: "Most businesses benefit from a significant website update every 2-4 years, depending on your industry, competition, and technological changes. However, we recommend ongoing optimization rather than waiting for a complete overhaul. Regular smaller updates to content, features, and design elements can keep your site current while maximizing your initial investment.",
    keywords: ["redesign", "how often", "update", "frequency", "when"]
  },
  {
    question: "Can you create websites with parallax scrolling effects?",
    answer: "Yes, we're experts in creating engaging parallax scrolling effects that add depth and visual interest to websites. We implement these effects thoughtfully, ensuring they enhance rather than distract from your content, and we always ensure proper performance optimization and mobile compatibility for these animation-heavy techniques.",
    keywords: ["parallax", "scrolling", "effect", "animation", "scroll"]
  },
  {
    question: "Can you create a website without code using website builders?",
    answer: "While we typically build custom coded solutions for maximum flexibility and performance, we can also create exceptional websites using no-code or low-code platforms like Webflow, Squarespace, or Wix if that better suits your needs. We bring our design expertise to these platforms while leveraging their ease of maintenance for simpler projects.",
    keywords: ["no code", "website builder", "webflow", "squarespace", "wix", "no-code"]
  },
  {
    question: "Can you help improve my website's conversion rate?",
    answer: "Absolutely! We specialize in conversion rate optimization (CRO) through data-driven design improvements. Our approach includes user behavior analysis, A/B testing, funnel optimization, call-to-action enhancement, form optimization, and user journey refinement. We focus on changes that will have the most significant impact on your specific conversion goals.",
    keywords: ["conversion", "cro", "optimize", "improve", "rate", "sales"]
  },
  {
    question: "Do you create landing pages for marketing campaigns?",
    answer: "Yes, we design and develop high-converting landing pages specifically optimized for marketing campaigns. Our landing pages focus on clear value propositions, strategic call-to-action placement, trust indicators, minimal distractions, and conversion-optimized forms. We can create standalone pages or ones that integrate with your existing website.",
    keywords: ["landing", "page", "campaign", "marketing", "ads", "conversion"]
  },
  {
    question: "Can you add animation and motion to my website?",
    answer: "Yes, we create custom animations and motion effects that enhance user experience and highlight key content. Our animation work includes micro-interactions, scroll-triggered animations, loading sequences, transition effects, and more complex motion graphics. We always implement these with performance and accessibility in mind.",
    keywords: ["animation", "motion", "movement", "effects", "transition", "scroll"]
  },
  {
    question: "How do you handle website backups?",
    answer: "For websites we maintain, we implement automated, regular backup systems that securely store complete copies of your website and database. These backups are typically stored in multiple locations for redundancy. We also perform manual backups before any significant updates or changes to ensure rapid recovery if needed.",
    keywords: ["backup", "save", "copy", "restore", "disaster", "recovery"]
  },
  {
    question: "Can you optimize my images for web use?",
    answer: "Yes, we provide comprehensive image optimization services including format selection (JPEG, PNG, WebP, AVIF), proper sizing, compression, lazy loading implementation, responsive image techniques, and alt text addition. These optimizations significantly improve load times while maintaining visual quality across all devices.",
    keywords: ["images", "optimize", "compress", "speed", "pictures", "photos"]
  },
  {
    question: "Do you create custom illustrations or graphics?",
    answer: "Yes, our design team creates custom illustrations, icons, and graphic elements that align with your brand identity. These unique visuals can differentiate your website, communicate complex concepts more effectively, and establish a distinctive visual language that strengthens your brand recognition.",
    keywords: ["illustrations", "graphics", "custom", "drawing", "icons", "visual"]
  },
  {
    question: "Can you assist with domain registration and setup?",
    answer: "Yes, we can help you select, register, and configure your domain name. Our domain services include availability checking, registration with appropriate privacy settings, DNS configuration, email setup, and ensuring proper connections to your hosting and website. We can either manage this entirely or guide you through the process.",
    keywords: ["domain", "url", "address", "register", "dns", "name"]
  },
  {
    question: "What is your approach to website testing?",
    answer: "Our comprehensive testing process includes cross-browser testing (Chrome, Firefox, Safari, Edge), device testing (desktop, tablet, mobile), functionality testing, performance testing, security scanning, accessibility evaluation, and user testing when applicable. We use both automated tools and manual testing to ensure quality across all dimensions.",
    keywords: ["testing", "quality", "assurance", "bugs", "errors", "browser"]
  },
  {
    question: "Can you create websites with 3D elements?",
    answer: "Yes, we design and develop websites featuring 3D elements using technologies like Three.js, WebGL, and CSS 3D transforms. These can range from simple 3D objects to immersive experiences, product showcases, or interactive 3D environments. We optimize 3D elements carefully to ensure good performance across devices.",
    keywords: ["3d", "three.js", "webgl", "model", "dimension", "interactive"]
  },
  {
    question: "Do you follow design trends or focus on timeless design?",
    answer: "We strike a balance between contemporary design trends and timeless principles. Our approach incorporates current visual styles and interaction patterns that users expect, while focusing on fundamentals like usability, readability, and brand alignment that won't quickly become dated. This results in designs that feel modern but remain effective for years.",
    keywords: ["trends", "timeless", "modern", "style", "fashion", "current"]
  },
  {
    question: "Can you build progressive web apps (PWAs)?",
    answer: "Yes, we design and develop Progressive Web Apps that combine the best of websites and native applications. Our PWAs feature offline functionality, home screen installation, push notifications, fast load times, and app-like interaction. These are particularly valuable for content-heavy sites, tools, or services with regular user engagement.",
    keywords: ["pwa", "progressive", "app", "offline", "application", "native"]
  },
  {
    question: "Do you provide website hosting recommendations?",
    answer: "Yes, we provide hosting recommendations tailored to your specific website needs, considering factors like expected traffic, technical requirements, budget, security needs, and performance expectations. While we don't directly provide hosting, we help you select the optimal solution from trusted providers and handle all technical setup.",
    keywords: ["hosting", "host", "server", "recommendation", "where", "suggest"]
  },
  {
    question: "How do you handle cross-browser compatibility?",
    answer: "We ensure cross-browser compatibility through standardized coding practices, progressive enhancement techniques, and comprehensive testing. We support all modern browsers (Chrome, Firefox, Safari, Edge) in their current and previous major versions. For older browsers like Internet Explorer, we implement graceful degradation to provide functional, if less enhanced, experiences.",
    keywords: ["browser", "compatibility", "cross-browser", "firefox", "chrome", "safari"]
  },
  {
    question: "Can you help with email marketing integration?",
    answer: "Yes, we integrate your website with email marketing platforms like Mailchimp, Campaign Monitor, Constant Contact, or ActiveCampaign. This includes sign-up forms, popup subscriptions, automation triggers, segmentation tagging, and ensuring proper data flow between your website and email marketing system.",
    keywords: ["email", "marketing", "newsletter", "mailchimp", "subscribe", "campaign"]
  },
  {
    question: "What is your quality assurance process?",
    answer: "Our quality assurance process includes multiple checkpoints throughout the project. Before delivery, we perform comprehensive testing including functionality testing, cross-browser compatibility, mobile responsiveness, performance optimization, security checks, content review, and accessibility verification. We use both automated tools and manual testing to ensure the highest quality.",
    keywords: ["quality", "assurance", "qa", "testing", "bugs", "errors"]
  },
  {
    question: "Can you integrate my website with my CRM system?",
    answer: "Yes, we integrate websites with popular CRM systems including Salesforce, HubSpot, Zoho, Microsoft Dynamics, and others. These integrations can include contact form submissions, user registrations, e-commerce transactions, and custom data flows. We ensure proper data mapping and validation for seamless information transfer.",
    keywords: ["crm", "salesforce", "hubspot", "integration", "customer", "relationship"]
  },
  {
    question: "How do you stay current with web design and development trends?",
    answer: "Our team maintains cutting-edge knowledge through continuous learning, including industry conferences, professional certifications, specialized training, membership in design and development communities, subscriptions to leading publications, and dedicated research time. We also conduct regular internal knowledge-sharing sessions to ensure everyone stays updated.",
    keywords: ["trends", "current", "modern", "latest", "new", "updated"]
  },
  {
    question: "What makes a successful web design project?",
    answer: "Successful web design projects combine several key elements: clear objectives and scope definition, thorough understanding of the target audience, effective communication throughout the process, strategic approach to content and functionality, technically sound implementation, thorough testing, and alignment with broader business goals and marketing strategies.",
    keywords: ["successful", "success", "effective", "good", "project", "results"]
  }
];

// Function to search for the best answer based on question similarity
export function findFAQAnswer(userQuestion: string): string {
  // Convert user question to lowercase for case-insensitive matching
  const normalizedQuestion = userQuestion.toLowerCase();
  
  // First try to find direct matches in the questions
  for (const faq of faqData) {
    if (faq.question.toLowerCase() === normalizedQuestion) {
      return faq.answer;
    }
  }
  
  // Then look for keyword matches
  let bestMatch: FAQItem | null = null;
  let bestMatchScore = 0;
  
  for (const faq of faqData) {
    let score = 0;
    
    // Check keywords
    for (const keyword of faq.keywords) {
      if (normalizedQuestion.includes(keyword.toLowerCase())) {
        score += 10; // More weight on exact keyword matches
      }
    }
    
    // Check for word matches in the question itself
    const questionWords = faq.question.toLowerCase().split(/\s+/);
    const userWords = normalizedQuestion.split(/\s+/);
    
    for (const userWord of userWords) {
      if (userWord.length < 3) continue; // Skip short words like "a", "an", "the", etc.
      
      if (questionWords.includes(userWord)) {
        score += 5;
      }
    }
    
    if (score > bestMatchScore) {
      bestMatchScore = score;
      bestMatch = faq;
    }
  }
  
  // If we found a good match (score threshold)
  if (bestMatch && bestMatchScore >= 10) {
    return bestMatch.answer;
  }
  
  // Default response if no good match is found
  return "I don't have specific information about that. Would you like to ask another question, or would you prefer to speak with a human team member? You can also contact us directly at hello@cherry.design or continue this conversation on WhatsApp.";
}

// Suggested questions to show users at the start
export const suggestedQuestions: string[] = [
  "What services do you offer?",
  "How much does a website cost?",
  "How long does a website take to build?",
  "What is your design process like?",
  "Do you offer e-commerce solutions?",
  "Can you redesign my existing website?",
  "How does the payment process work?",
  "What happens after my website launches?",
  "What makes Cherry.design different?",
  "Do you work with international clients?"
];