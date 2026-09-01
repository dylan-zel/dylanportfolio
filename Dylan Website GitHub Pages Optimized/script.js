const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".project-photo video").forEach((video) => {
  video.play().catch(() => {});
});

const lightbox = document.querySelector(".lightbox");
const lightboxTitle = document.querySelector(".lightbox h2");
const lightboxArt = document.querySelector(".lightbox-art");
const closeLightbox = document.querySelector(".lightbox-close");
const imageLightbox = document.querySelector(".image-lightbox");
const imageLightboxImage = document.querySelector(".image-lightbox img");
const imageLightboxVideo = document.querySelector(".image-lightbox video");
const supportingMedia = document.querySelector(".project-supporting-media");
const sheetRole = document.querySelector(".sheet-role");
const sheetTitle = document.querySelector(".project-sheet-body h2");
const sheetDescription = document.querySelector(".sheet-description");
const sheetTools = document.querySelector(".sheet-tools");
const sheetPoints = document.querySelector(".sheet-points");
const sheetVideos = document.querySelector(".sheet-videos");
const extraMedia = document.querySelector(".project-extra-media");
const imageLightboxClose = document.querySelector(".image-lightbox-close");
const projectFullscreen = document.querySelector(".project-fullscreen");
const projectFullscreenImage = document.querySelector(".project-fullscreen img");
const projectFullscreenClose = document.querySelector(".project-fullscreen-close");
const projectPrevButton = document.querySelector(".project-nav-prev");
const projectNextButton = document.querySelector(".project-nav-next");
const fullscreenPrevButton = document.querySelector(".project-fullscreen-prev");
const fullscreenNextButton = document.querySelector(".project-fullscreen-next");
const projectButtons = Array.from(document.querySelectorAll(".project-photo"));
let activeProject = null;
let activeProjectId = "";
let activeImageIndex = 0;
let fullscreenImages = [];
let fullscreenImageIndex = 0;

const projectSheets = {
  "lunabotics-2026": {
    title: "Lunabotics 2026",
    role: "Founder and Project Lead",
    image: "assets/lunabotics-2026-02.jpg",
    images: ["assets/lunabotics-2026-02.jpg", "assets/lunabotics-2026-01.jpg", "assets/lunabotics-2026-fea.jpg", "assets/lunabotics-2026-excavation-cad.jpg", "assets/lunabotics-2026-rover-cad.jpg"],
    media: [
      { kind: "image", src: "assets/lunabotics-2026-02.jpg" },
      { kind: "image", src: "assets/lunabotics-2026-01.jpg" },
      { kind: "image", src: "assets/lunabotics-2026-fea.jpg" },
      { kind: "image", src: "assets/lunabotics-2026-excavation-cad.jpg" },
      { kind: "image", src: "assets/lunabotics-2026-rover-cad.jpg" }
    ],
    description: "A second-year NASA Lunabotics rover effort focused on lightweight design, reliable excavation, additive manufacturing, and leading a rapidly expanding student team.",
    tools: ["Fusion 360", "ANSYS", "DEM", "Additive Manufacturing", "Team Leadership", "Project Logistics"],
    layout: "stacked",
    sections: [
      {
        text: "In 2025-2026, our NASA Lunabotics team expanded from four members to more than twenty as we designed a new rover for the NASA Lunabotics Challenge. Our design philosophy remained consistent with the previous year: keep the rover lightweight and simple while improving the overall design in nearly every aspect. Key improvements included placing the motors inside the aluminum chassis to improve dust protection, increasing the wheel diameter while reducing wheel weight, and developing a more reliable excavation system that could dig smoothly through regolith. With the team growing significantly, I took more of a step back from the detailed design phase to focus on the logistics of managing a larger team. My responsibilities included reaching out to sponsors, preparing documentation, and helping organize the work needed to keep the project moving across multiple subteams. During fabrication, I led the team's additive-manufacturing projects, including the wheels, excavation drum, and camera and sensor mounts. These components required iterative design and fabrication to balance weight, strength, reliability, and ease of assembly while supporting the rover's larger mechanical system. Although we came up short in the competition, we received the Phoenix Award for Most Efficient Power Usage. The project helped the team continue the progress made during its first year, and I hope the team can carry that momentum forward into the next competition season.",
        media: { kind: "image", src: "assets/lunabotics-2026-01.jpg" }
      }
    ],
    points: [
      "Expanded the NASA Lunabotics team from four members to more than twenty.",
      "Led project logistics, sponsorship outreach, and technical documentation for a larger team.",
      "Led additive-manufacturing projects for wheels, the excavation drum, and camera and sensor mounts.",
      "Team received the Phoenix Award for Most Efficient Power Usage."
    ],
    extraMedia: [
      { kind: "image", src: "assets/lunabotics-2026-02.jpg" },
      { kind: "image", src: "assets/lunabotics-2026-fea.jpg" },
      { kind: "image", src: "assets/lunabotics-2026-excavation-cad.jpg" },
      { kind: "image", src: "assets/lunabotics-2026-rover-cad.jpg" }
    ]
  },
  "lunabotics-2025": {
    title: "Lunabotics 2025",
    role: "Founder and Project Lead",
    image: "assets/lunabotics2025.jpg",
    images: ["assets/lunabotics2025.jpg", "assets/lunabotics-2025-field.jpg", "assets/img-0419.jpg", "assets/cleanroom.jpg"],
    videos: [
      {
        title: "Lunabotics 2025 Run",
        src: "assets/lunabotics-2025-final-cropped.mov"
      }
    ],
    media: [
      { kind: "video", title: "Lunabotics 2025 Run", src: "assets/lunabotics-2025-final-cropped.mov", position: "center center" },
      { kind: "image", src: "assets/lunabotics2025.jpg" },
      { kind: "video", title: "FDM Fabrication", src: "" },
      { kind: "video", title: "Lunabotics 2025 Demo", src: "assets/lunabotics-2025-demo.mov" },
      { kind: "image", src: "assets/lunabotics-2025-belt.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-wheels.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-dirt-testing.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-electrical-layout.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-fea.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-gantt-chart.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-field.jpg" },
      { kind: "image", src: "assets/img-0419.jpg" },
      { kind: "image", src: "assets/cleanroom.jpg" }
    ],
    description: "A lunar excavation rover developed for NASA Lunabotics, focused on mobility, regolith collection, structural validation, and first-year competition execution.",
    tools: ["Fusion 360", "ANSYS", "DEM", "Additive Manufacturing", "Team Leadership"],
    sections: [
      {
        text: "In 2024-2025, four other members and I founded our university's NASA Lunabotics team with plans to compete that same year. The competition challenged teams to design and fabricate a lunar excavation rover, then compete in a simulated Moon environment to dig the greatest volume of material relative to rover weight. As a team lead on a small team, my responsibilities included team organization, Gantt charts, documentation, budgets, travel planning, securing funding, and leading the mechanical design of the rover's chassis, wheels, and excavation system.",
        media: { kind: "image", src: "assets/lunabotics2025.jpg" }
      },
      {
        text: "The design philosophy was to stay as light as possible to avoid sinking in lunar regolith and maximize points earned. This also kept systems simple, reduced failure modes, and made the rover more affordable, which was critical for a first-year team. That approach led to a frame built from three welded 6061 aluminum tubes, leaving space to run belts that powered all four wheels while helping keep the drivetrain protected from dust. The excavation system used a rotating drum that could be raised and lowered for digging and dumping, keeping the mechanism lightweight and mechanically simple because digging and dumping used the same motion in reverse.",
        media: { kind: "video", src: "", position: "center center" }
      },
      {
        text: "To build confidence in the rover design, we ran multiple simulations. FEA on the chassis confirmed that the aluminum tube frame would not meaningfully deform under expected loads, and DEM simulations helped fine-tune the dimensions of the drum excavation system. We also physically tested as much as possible, including a scaled drum test in snow, because sand was hard to find in Buffalo in the middle of winter, and a wheel load test to make sure the printed wheel would not crack.",
        media: { kind: "image", src: "assets/lunabotics-2025-fea.jpg", position: "70% center" }
      },
      {
        text: "We completed most of the rover in time for competition and won Best First-Year Team. I learned an enormous amount from this project in team management, fabrication, problem solving, mechanical design, and working closely with a team under real schedule pressure.",
        media: { kind: "image", src: "assets/lunabotics-2025-field.jpg" }
      }
    ],
    extraMedia: [
      { kind: "video", src: "assets/lunabotics-2025-demo.mov" },
      { kind: "image", src: "assets/regolith-testbed.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-gantt-chart.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-belt.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-wheels.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-dirt-testing.jpg" },
      { kind: "image", src: "assets/lunabotics-2025-electrical-layout.jpg" },
      { kind: "image", src: "assets/img-0419.jpg" },
      { kind: "image", src: "assets/cleanroom.jpg" }
    ],
    points: [
      "Led the mechanical CAD design and fabrication of a lunar rover prototype.",
      "Designed custom wheels, modular chassis elements, and a rotating drum excavator concept.",
      "Used rapid prototyping and FDM fabrication to iterate rover components before final assembly.",
      "Developed belt-driven excavation concepts and tested collection behavior in regolith-like material.",
      "Validated wheel geometry, traction concepts, and manufacturability through hands-on build testing.",
      "Planned the power and control layout around practical wiring, motor drivers, emergency stop, and onboard compute needs.",
      "Used FEA and simulation feedback to evaluate structural loading and improve design confidence.",
      "Managed the project schedule across mission concept review, subsystem development, final design, assembly, testing, and competition milestones.",
      "Team received Best First-Year Presentation and Demonstration."
    ]
  },
  lunabotics: {
    title: "NASA Lunabotics",
    role: "Founder and Project Lead",
    image: "assets/lunabotics2025.jpg",
    images: ["assets/lunabotics2025.jpg", "assets/regolith-testbed.jpg", "assets/cleanroom.jpg"],
    description: "A lunar excavation rover project developed for NASA's Lunabotics Challenge, focused on mobility, regolith handling, structural validation, and competition-ready system integration.",
    tools: ["Fusion 360", "ANSYS", "DEM", "Additive Manufacturing", "Systems Engineering"],
    points: [
      "Founded and led a multidisciplinary student team around a lunar robotics competition.",
      "Coordinated rover subsystem development across drivetrain, excavation, structure, and testing.",
      "Balanced weight, manufacturability, durability, and competition constraints.",
      "Team received Best First-Year Presentation and Demonstration."
    ]
  },
  ugv: {
    title: "Rover Development Platform",
    role: "Robotics Platform Development",
    image: "assets/autonomousrover1.jpg",
    images: ["assets/autonomousrover1.jpg", "assets/img-1184.jpg", "assets/img-1999.jpg"],
    description: "A personal rover platform that evolved into a hands-on robotics club learning project for mechanical design, additive manufacturing, and hardware-software integration.",
    tools: ["Fusion 360", "Rocker Suspension", "PETG", "TPU", "Additive Manufacturing", "Robotics Education"],
    sections: [
      {
        text: "This project began as a personal mechanical design project and evolved into a hands-on learning platform for members of my robotics club. I designed the rover's mechanical structure in Fusion 360, incorporating a rocker-style suspension system to allow the wheels to independently conform to uneven terrain while maintaining stability and ground contact.",
        media: { kind: "image", src: "assets/autonomousrover1.jpg" }
      },
      {
        text: "The rover was designed around additive manufacturing, with the primary structural components printed in PETG for strength and durability and flexible components manufactured from TPU where additional compliance and traction were needed, such as wheel tires and wire-routing parts. The design also emphasized modularity, allowing the mechanical platform to support different electronics, sensors, and control systems as the project developed.",
        media: { kind: "image", src: "assets/img-1184.jpg" }
      },
      {
        text: "Beyond the mechanical design, the rover was intended to serve as a hands-on learning platform for members of my robotics club. Through my experience leading the club, I noticed that many computer science students were interested in robotics but struggled to translate their software knowledge into physical hardware projects. Because of this, I wanted to create accessible projects at different skill levels that allowed members to gain practical experience with motor control, embedded electronics, sensors, and hardware-software integration. By providing a completed mechanical platform, members could focus on developing and implementing the electrical and software systems while gaining experience with how their code interacts with real-world hardware.",
        media: { kind: "image", src: "assets/img-1999.jpg" }
      }
    ],
    points: [
      "Designed a rocker-style suspension rover platform in Fusion 360.",
      "Used PETG and TPU additive manufacturing for structural and flexible components.",
      "Built the platform to support modular electronics, sensors, and control systems.",
      "Created the project as an accessible hardware platform for robotics club members."
    ]
  },
  "autonomous-ugv": {
    title: "Autonomous UGV",
    role: "Autonomous Rover Platform",
    image: "assets/hero-rover.jpg",
    images: ["assets/hero-rover.jpg", "assets/img-2174.jpg"],
    media: [
      { kind: "video", title: "Autonomous UGV Drive Test", src: "" },
      { kind: "image", src: "assets/hero-rover.jpg" },
      { kind: "image", src: "assets/img-2174.jpg" }
    ],
    videos: [
      {
        title: "Autonomous UGV Drive Test",
        src: ""
      }
    ],
    description: "A modular personal robotics platform built for mecanum-drive control, ROS 2 experimentation, sensor integration, and future autonomous navigation work.",
    tools: ["Fusion 360", "ROS 2", "Raspberry Pi 5", "Brushless DC Motors", "Mecanum Wheels", "3D Printing"],
    sections: [
      {
        text: "This project was primarily created as a personal robotics platform that I could continue experimenting with and expanding over time. From the beginning, I wanted the robot to be modular, leaving room to integrate additional sensors, test different wheel configurations, and develop new control methods without redesigning the entire platform. The robot is controlled using a Raspberry Pi 5 and four brushless DC motors, with each motor independently driving a custom-designed mecanum wheel. This configuration gives the robot three degrees of freedom, allowing it to move forward and backward, strafe laterally, and rotate in place. A ROS 2 framework handles communication and control, with a phone-based interface translating user inputs into individual motor commands. Another related project also used a haptic glove to control the robot by drawing hand commands that the robot would then carry out.",
        media: { kind: "image", src: "assets/autonomous-ugv-closeup.jpg" }
      },
      {
        text: "The mechanical system was designed entirely in Fusion 360 and went through more than ten major design iterations before reaching the current version. Throughout the design process, I focused on reducing unnecessary weight, improving component accessibility, simplifying assembly, and maintaining enough internal space for future electronics and sensors. The chassis was manufactured primarily from PETG on a Bambu Lab P1P, while the mecanum wheels were custom designed and manufactured separately. The wheel rollers were printed from ABS to provide a durable contact surface while maintaining the geometry required for omnidirectional movement. The modular chassis provides space for additional hardware such as LiDAR, cameras, and other sensors, allowing the robot to eventually support localization, mapping, and autonomous navigation.",
        media: { kind: "image", src: "assets/autonomous-ugv-robot-platform.jpg" }
      }
    ],
    extraMedia: [
      { kind: "video", title: "Autonomous UGV Working Video", src: "" },
      { kind: "image", src: "assets/autonomous-ugv-system-architecture.jpg" },
      { kind: "image", src: "assets/autonomous-ugv-robot-platform.jpg" },
      { kind: "image", src: "assets/hero-rover.jpg" },
      { kind: "image", src: "assets/img-2174.jpg" }
    ],
    points: [
      "Designed a modular personal robotics platform for long-term autonomy experimentation.",
      "Implemented ROS 2 control using a Raspberry Pi 5, four brushless DC motors, and custom mecanum wheels.",
      "Iterated through more than ten major Fusion 360 designs to improve weight, serviceability, assembly, and electronics packaging.",
      "Designed the platform for future LiDAR, camera, localization, mapping, and autonomous navigation work."
    ]
  },
  "project-slot-1": {
    title: "Robotic Arm Carriage Attachment (WIP)",
    role: "Mechanical redesign for an industrial conveyor automation attachment",
    image: "assets/xarm6-carriage.jpg",
    images: ["assets/xarm6-carriage.jpg", "assets/xarm6-project.jpg"],
    media: [
      { kind: "image", src: "assets/xarm6-carriage.jpg" },
      { kind: "video", title: "Original Design 1", src: "" },
      { kind: "video", title: "Original Design 2", src: "" },
      { kind: "image", src: "assets/xarm6-project.jpg" },
      { kind: "video", title: "Design Iteration V5", src: "" }
    ],
    description: "A variable-stiffness robotic arm carriage attachment redesigned for improved modularity, packaging, reliability, and future integration onto a factory robotic arm.",
    tools: ["Robotic Arm", "Mechanical Design", "Fusion 360", "PETG-CF", "Variable Stiffness", "Enclosure Design"],
    layout: "stacked",
    sections: [
      {
        text: "This project was part of the Human in the Loop (HILs) Lab, where I was tasked with redesigning and updating an existing robotic arm carriage attachment. The mechanism is positioned between the robotic arm and end-effector and provides an adjustable level of mechanical stiffness. By changing the distance between the magnets and the center carriage, the resistance of the mechanism can be modified, allowing the end-effector to respond differently to external forces. This variable-stiffness design is intended for applications such as conveyor-belt operations and other tasks requiring precise, controlled interaction with objects while maintaining a degree of mechanical compliance."
      },
      {
        text: "As part of the redesign, my primary goals were to improve modularity, reliability, and overall packaging. The system was designed to allow additional components or features to be integrated in the future while also enclosing the belt, pulleys, motor, and wiring. The outer housing is 3D printed from PETG-CF, with an acrylic cover that provides visibility into the mechanism for inspection and maintenance. The motor and wiring are enclosed and routed internally, a bearing was added to support and stabilize the opposite axle, and the overall profile of the assembly was lowered to reduce bulk and create a more compact design. The next step for the project is to integrate the redesigned attachment onto the factory robotic arm and conduct extensive testing to evaluate its reliability, stiffness adjustment, and performance under repeated operating conditions."
      }
    ],
    extraMedia: [
      { kind: "video", title: "Original Design 1", src: "" },
      { kind: "video", title: "Original Design 2", src: "" },
      { kind: "image", src: "assets/xarm6-project.jpg" },
      { kind: "video", title: "Design Iteration V5", src: "" }
    ],
    points: [
      "Redesigned a variable-stiffness carriage attachment for a robotic arm and end-effector system.",
      "Improved modularity, reliability, internal routing, and overall packaging.",
      "Enclosed the belt, pulleys, motor, and wiring inside a PETG-CF housing with an acrylic inspection cover.",
      "Prepared the system for future robotic-arm integration and repeated reliability testing."
    ]
  },
  "bright-electronics": {
    title: "Bright Electronics Manufacturing Challenge (WIP)",
    role: "Planning, Organization, and Mechanical Design",
    image: "assets/bright-electronics-line-follower-clean.jpg",
    images: ["assets/bright-electronics-line-follower-clean.jpg", "assets/bright-electronics-gearbox.jpg"],
    description: "A high-speed autonomous line-following robot for the Bright Electronics Manufacturing Challenge, focused on drivetrain packaging, mechanical design, and competition-ready manufacturing.",
    tools: ["SLA Printing", "Gearbox Design", "Mechanical Design", "Manufacturing Planning", "Team Organization"],
    layout: "stacked",
    sections: [
      {
        text: "This project focuses on the design and development of a high-speed autonomous line-following robot for the Bright Electronics Manufacturing Challenge. My role includes project planning, team organization, and leading the mechanical design and manufacturing of the robot."
      },
      {
        text: "For the drivetrain, I designed a compact 8:1 planetary gearbox to increase the available wheel torque while maintaining a small and lightweight package. As a competition requirement, each team was constrained to the same motor, so replacing the gearbox with a more compact, lower-ratio design was important for giving our team an advantage. The gearbox components were manufactured using SLA 3D printing to achieve the precision and tolerances required for reliable gear operation. The mechanical design was developed around weight, packaging, manufacturability, and reliability constraints, with an emphasis on creating a competition-ready system that can be easily assembled, maintained, and iterated upon. We ended up placing 12th out of 40 teams and are hoping to continue our redesign and place even better next time."
      }
    ],
    extraMedia: [
      { kind: "image", src: "assets/bright-electronics-line-follower-clean.jpg" },
      { kind: "image", src: "assets/bright-electronics-gearbox.jpg" }
    ],
    points: [
      "Responsible for project planning, organization, and mechanical design direction.",
      "Designed a custom 1:8 planetary gearbox for the line follower robot drivetrain.",
      "Used SLA manufacturing processes to print precise gearbox components for compact packaging.",
      "Balanced manufacturability, drivetrain constraints, and competition-focused reliability."
    ]
  },
  urc: {
    title: "University Rover Challenge",
    role: "Founder and Team Lead",
    image: "assets/spacebulls.jpg",
    images: ["assets/spacebulls.jpg", "assets/spacebulls1.jpg", "assets/spacebulls2.jpg", "assets/spacebulls3.jpg"],
    description: "A Mars rover team founded for the University Rover Challenge, focused on team building, active suspension, terrain mobility, manipulation, and science-task capability.",
    tools: ["Team Leadership", "Mechanical Design", "Systems Planning", "Active Suspension", "Mars Rover Design"],
    layout: "stacked",
    sections: [
      {
        text: "I founded UB Space Bulls, a team designing Mars rovers for the University Rover Challenge. The purpose of the competition is to design a rover capable of completing multiple tasks, including autonomous navigation, tool manipulation, item retrieval, and soil-sample testing for signs of life. I started the team as a passion project after becoming extremely interested in the competition, then built it by finding advisors, recruiting members through classroom visits, hosting information sessions, and tabling around campus. Our rover was built from a previous platform and repurposed for the competition. It uses four linear actuators for active suspension, along with an onboard IMU to actively level the rover while operating on inclined terrain. We also designed larger-diameter wheels to improve traction on harsh terrain, and a new arm on a rail system is currently being developed for the manipulation and retrieval mission. After spending two years setting up the team and working on the initial rover, I can look back and see how this project helped start my passion for space robotics, team leadership, and solving difficult engineering problems."
      }
    ],
    extraMedia: [
      { kind: "image", src: "assets/spacebulls.jpg" },
      { kind: "image", src: "assets/spacebulls1.jpg" },
      { kind: "image", src: "assets/spacebulls2.jpg" },
      { kind: "image", src: "assets/spacebulls3.jpg" }
    ],
    points: [
      "Founded UB Space Bulls for the University Rover Challenge.",
      "Recruited advisors and members through classroom visits, information sessions, and campus tabling.",
      "Helped repurpose a rover platform with active suspension, IMU leveling, improved wheels, and a new manipulation system.",
      "Built the foundation for a long-term student space robotics team."
    ]
  },
  regolith: {
    title: "Regolith Excavation and Mobility Testing Platform",
    role: "Excavation and Mobility Testing",
    image: "assets/regolith-testbed.jpg",
    images: ["assets/regolith-testbed.jpg"],
    description: "A test platform for evaluating excavation concepts and wheel performance in regolith-like material to guide lunar rover design decisions.",
    tools: ["Test Design", "CAD", "BOM Planning", "Fabrication", "Mobility Testing"],
    points: [
      "Designed a platform for testing both excavation mechanisms and wheel concepts.",
      "Created CAD models and bill-of-material planning for fabrication.",
      "Built around practical feedback loops for rover subsystem improvement.",
      "Supports future testing of lunar excavation and mobility design assumptions."
    ]
  },
  drone: {
    title: "Search and Rescue Drone Intramural",
    role: "Student Project Lead",
    image: "assets/generativedesigndrone1.jpg",
    images: ["assets/generativedesigndrone1.jpg", "assets/generativedesigndrone.jpg", "assets/drone-generative-design-final.jpg"],
    description: "A four-person intramural drone project exploring generative design, lightweight chassis design, structural performance, and team-led prototype development.",
    tools: ["Generative Design", "CAD", "Lightweight Structures", "Prototype Development", "Team Leadership", "Component Packaging"],
    layout: "stacked",
    sections: [
      {
        text: "This project was completed as part of a four-person intramural engineering team, where I served as the team lead. The goal was to design and build a drone capable of successfully navigating a designated flight course. For the chassis, I decided to explore generative design as a way to reduce weight and material while maintaining the structural strength needed for flight. The project gave me the opportunity to gain hands-on experience with generative design and better understand the tradeoffs between weight, structural performance, manufacturability, and component packaging. As team lead, I also coordinated the design and build process between team members to bring the final drone together."
      }
    ],
    extraMedia: [
      { kind: "image", src: "assets/generativedesigndrone1.jpg" },
      { kind: "image", src: "assets/generativedesigndrone.jpg" },
      { kind: "image", src: "assets/drone-generative-design-final.jpg" }
    ],
    points: [
      "Led student work on a search and rescue concept with real-world field constraints.",
      "Guided early mechanical design, prototype planning, and team coordination.",
      "Focused on affordability, reliability, and accessible fabrication methods."
    ]
  },
  hopping: {
    title: "Robot Form and Function Lab Project",
    role: "Scientific Researcher",
    image: "assets/buffalo-byte-main.jpg",
    images: ["assets/buffalo-byte-main.jpg"],
    description: "A redesign of the Buffalo Byte robot project focused on improving ease of assembly, reducing part count, and making the robot more modular.",
    tools: ["Autodesk", "Mechanical Redesign", "Part Count Reduction", "Design for Assembly", "Robotics"],
    layout: "stacked",
    sections: [
      {
        text: "This project was completed through the Robot Form and Function Lab, where I redesigned the Buffalo Byte project to improve ease of assembly and reduce the overall part count. The redesign focused on simplifying the robot's structure, making components easier to manufacture and install, and improving modularity so the platform could be assembled, maintained, and modified more efficiently."
      }
    ],
    extraMedia: [
      { kind: "image", src: "assets/buffalo-byte-main.jpg" }
    ],
    points: [
      "Explored topology and generative design approaches for robotic structures.",
      "Worked toward reducing part count, mass, and mechanical complexity.",
      "Connected mechanical design choices to robot motion and durability."
    ]
  },
  "arduino-rover": {
    title: "Arduino Rover",
    role: "Robotics Prototype",
    media: [
      { kind: "video", title: "Arduino Rover Test", src: "assets/arduino-rover-video.mov" },
      { kind: "image", src: "assets/arduino-rover-obstacle.jpg" },
      { kind: "image", src: "assets/arduino-rover-electronics.jpg" }
    ],
    videos: [
      {
        title: "Arduino Rover Test",
        src: "assets/arduino-rover-video.mov"
      }
    ],
    description: "A first Arduino-based robotics project focused on learning mechanical design, electrical integration, serial control, and generative design for lightweight rover structures.",
    tools: ["Arduino", "Fusion 360", "Generative Design", "PLA 3D Printing", "Serial Control", "Rocker Suspension"],
    layout: "stacked",
    sections: [
      {
        text: "This was my first Arduino-based robotics project, where I designed and built a remote-controlled rover using four DC motors and a simple rocker-style suspension. The rover was designed in Fusion 360 and primarily 3D printed in PLA, with the goal of building the mechanical and electrical systems from scratch while learning more about robotics. I also used the project as an opportunity to experiment with generative design for the chassis and explore how it could be applied to lightweight robotic structures. The rover was controlled through serial commands, with the electronics intentionally left accessible on the chassis and a breadboard included to make it easy to add sensors and experiment with future upgrades."
      }
    ],
    extraMedia: [
      { kind: "video", title: "Arduino Rover Test", src: "assets/arduino-rover-video.mov" },
      { kind: "image", src: "assets/arduino-rover-obstacle.jpg" },
      { kind: "image", src: "assets/arduino-rover-electronics.jpg" }
    ],
    points: [
      "Built as a compact platform for testing basic rover control and mechanical packaging.",
      "Supports hands-on iteration across drivetrain, chassis, and electronics layout.",
      "Serves as a practical bridge between classroom concepts and working hardware."
    ]
  },
  "arduino-workshop-robot": {
    title: "Arduino Workshop Robot",
    role: "Educational Robotics Platform",
    image: "assets/arduino-workshop-robot.jpg",
    images: ["assets/arduino-workshop-robot.jpg"],
    media: [
      { kind: "video", title: "Workshop Robot Test", src: "assets/arduino-workshop-robot-video.mov" },
      { kind: "image", src: "assets/arduino-workshop-robot.jpg" }
    ],
    description: "A compact workshop robot developed to onboard new robotics club members and give students an approachable first experience with hardware, electronics, and programming.",
    tools: ["Arduino", "DC Motors", "Breadboarding", "3D Printing", "Robotics Education", "Workshop Development"],
    sections: [
      {
        text: "This project was part of a workshop program I developed to onboard new members of the robotics club, as well as students who were simply interested in learning more about robotics. The goal was to create an approachable starting point for people with little to no previous hardware experience.",
        media: { kind: "video", title: "Workshop Robot Test", src: "assets/arduino-workshop-robot-video.mov" }
      },
      {
        text: "The robot was intentionally kept simple, using an Arduino, two DC motors, a caster wheel, and a breadboard-based electrical system. Rather than designing a finished robot with a single purpose, I wanted to give members a platform they could easily understand and expand upon. From the base design, members could add components such as ultrasonic sensors, LEDs, or additional electronics to begin experimenting with autonomous navigation and other robotics concepts.",
        media: { kind: "image", src: "assets/arduino-workshop-robot.jpg" }
      },
      {
        text: "The project was paired with a series of hands-on workshops covering Arduino fundamentals, basic wiring and electronics, 3D modeling, and introductory programming. The overall goal was to give new members the foundational skills and confidence needed to move from simple exercises into larger robotics club projects."
      }
    ],
    points: [
      "Designed as an approachable robot for teaching basic electronics, controls, and mechanical assembly.",
      "Uses simple, accessible components so students can understand and modify the platform.",
      "Built around workshop-friendly iteration and clear hardware layout."
    ]
  },
  "robotics-club-educational-robot": {
    title: "Robotics Club Educational Robot",
    role: "President and Project Lead",
    image: "assets/img-2967.jpg",
    images: ["assets/img-2967.jpg", "assets/ros-platform.jpg"],
    description: "A modular robotics platform for learning ROS, mecanum-drive control, LiDAR integration, and future mapping, localization, and autonomous navigation work.",
    tools: ["ROS", "Mecanum Wheels", "LiDAR", "Motor Control", "Sensor Integration", "Autonomous Navigation"],
    layout: "stacked",
    sections: [
      {
        text: "This project was designed as a modular robotics platform for learning and experimenting with ROS. The robot uses four mecanum wheels to provide omnidirectional movement and incorporates a LiDAR sensor to support future work with mapping, localization, and autonomous navigation. The platform was designed to give me a physical system for practicing the connection between ROS software and real-world hardware, including motor control, sensor integration, odometry, and eventually SLAM and autonomous path planning. The mechanical structure was designed to remain compact and modular, leaving room to add or replace sensors and other hardware as I continue experimenting with more advanced ROS applications."
      }
    ],
    extraMedia: [
      { kind: "image", src: "assets/img-2967.jpg" },
      { kind: "image", src: "assets/ros-platform.jpg" }
    ],
    points: [
      "Designed as an approachable platform for new robotics club members.",
      "Supports hands-on learning across mechanical design, electronics, and basic programming.",
      "Used to help students move from theory into working robot hardware."
    ]
  },
  "robotics-club": {
    title: "Robotics Club Projects",
    role: "President and Project Lead",
    image: "assets/hero-rover.jpg",
    images: ["assets/hero-rover.jpg", "assets/autonomousrover1.jpg", "assets/spacebulls1.jpg"],
    description: "Served as president of UB Robotics Club, leading student robotics projects and competitions including BattleBots-style builds and VEX Robotics.",
    tools: ["Leadership", "Robotics", "BattleBots", "VEX Robotics", "Team Building"],
    points: [
      "Led club planning, project organization, and technical direction as president.",
      "Supported competition-focused robotics projects including BattleBots-style robots and VEX Robotics.",
      "Helped create a stronger student robotics community at UB."
    ]
  },
  bioimpedance: {
    title: "Textile Bioimpedance Research",
    role: "Scientific Researcher",
    image: "assets/cleanroom.jpg",
    images: ["assets/cleanroom.jpg"],
    description: "Biomedical engineering research on textile electrodes as an alternative to conventional spot electrodes for calf bioimpedance measurements.",
    tools: ["MATLAB", "Python", "Research", "Biomedical Instrumentation"],
    points: [
      "Conducted early independent research on wearable sensing technology.",
      "Contributed to work published in Biomedical Physics & Engineering Express.",
      "Focused on textile electrodes for noninvasive physiological measurement."
    ]
  },
  manufacturing: {
    title: "Digital Manufacturing Workflows",
    role: "Graduate Research Assistant",
    image: "assets/regolith-testbed.jpg",
    images: ["assets/regolith-testbed.jpg", "assets/cleanroom.jpg"],
    description: "Hands-on digital manufacturing work supporting print jobs, material selection, print orientation, support strategy, and post-processing.",
    tools: ["FDM", "SLA", "PolyJet", "CFF", "Printer Maintenance"],
    points: [
      "Manage 3D printing work orders across multiple additive manufacturing processes.",
      "Support students, faculty, and industry users with practical fabrication guidance.",
      "Balance print quality, turnaround time, material choice, and machine constraints."
    ]
  },
  "senior-design": {
    title: "Senior Design Support",
    role: "Graduate Teaching Assistant",
    image: "assets/ugv-render.jpg",
    images: ["assets/ugv-render.jpg", "assets/regolith-testbed.jpg"],
    description: "Teaching and evaluation support for senior mechanical engineering design teams, with emphasis on CAD, documentation, and design review quality.",
    tools: ["CAD Review", "Technical Documentation", "Design Reviews", "Mentorship"],
    points: [
      "Provide feedback on mechanical designs, CAD models, and technical documentation.",
      "Support milestone reviews and consistent evaluation across multiple teams.",
      "Help students communicate engineering decisions more clearly."
    ]
  }
};

const projectIds = projectButtons.map((button) => button.dataset.project).filter((id) => projectSheets[id]);

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxTitle || !lightboxArt) return;
    lightbox.classList.add("open");
    lightboxTitle.textContent = item.dataset.title || "Astrophotography";
    lightboxArt.className = "lightbox-art";
    lightboxArt.style.backgroundImage = item.dataset.image ? `url("${item.dataset.image}")` : "";
  });
});

function closePreview() {
  if (lightbox) {
    lightbox.classList.remove("open");
  }
  if (lightboxArt) {
    lightboxArt.style.backgroundImage = "";
  }
}

function getProjectImageSources(sheet) {
  if (!sheet) return [];
  const sources = [];
  const addSource = (item) => {
    if (!item) return;
    if (typeof item === "string") {
      sources.push(item);
      return;
    }
    if (item.kind === "image" && item.src) sources.push(item.src);
  };

  getProjectImages(sheet).forEach(addSource);
  getProjectMedia(sheet).forEach(addSource);
  (sheet.sections || []).forEach((section) => addSource(section.media));
  (sheet.extraMedia || []).forEach(addSource);

  return [...new Set(sources)];
}

function openFullResolutionImage(src, title = "Project photo") {
  if (!projectFullscreen || !projectFullscreenImage || !src) return;
  fullscreenImages = getProjectImageSources(activeProject);
  fullscreenImageIndex = fullscreenImages.indexOf(src);
  if (fullscreenImageIndex === -1) {
    fullscreenImages = [src, ...fullscreenImages.filter((imageSrc) => imageSrc !== src)];
    fullscreenImageIndex = 0;
  }
  projectFullscreen.classList.add("open");
  projectFullscreenImage.src = fullscreenImages[fullscreenImageIndex];
  projectFullscreenImage.alt = title;
}

function closeFullResolutionImage() {
  if (!projectFullscreen || !projectFullscreenImage) return;
  projectFullscreen.classList.remove("open");
  projectFullscreenImage.src = "";
  projectFullscreenImage.alt = "";
  fullscreenImages = [];
  fullscreenImageIndex = 0;
}

function navigateFullResolutionImage(direction) {
  if (!projectFullscreen || !projectFullscreen.classList.contains("open") || !fullscreenImages.length) return;
  fullscreenImageIndex = (fullscreenImageIndex + direction + fullscreenImages.length) % fullscreenImages.length;
  projectFullscreenImage.src = fullscreenImages[fullscreenImageIndex];
  projectFullscreenImage.alt = activeProject ? `${activeProject.title} photo ${fullscreenImageIndex + 1}` : `Project photo ${fullscreenImageIndex + 1}`;
}

if (closeLightbox) {
  closeLightbox.addEventListener("click", closePreview);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closePreview();
  });
}

function getProjectImages(sheet) {
  if (sheet.images) return sheet.images;
  return sheet.image ? [sheet.image] : [];
}

function getProjectMedia(sheet) {
  if (sheet.media) return sheet.media;
  const videos = (sheet.videos || []).map((video) => ({ ...video, kind: "video" }));
  const images = getProjectImages(sheet).map((src) => ({ src, kind: "image" }));
  return [...videos, ...images];
}

function renderMediaItem(item) {
  if (!item) return "";
  const mediaStyle = [
    item.position ? `object-position: ${item.position};` : "",
    item.scale ? `transform: scale(${item.scale});` : ""
  ].join(" ");
  const positionStyle = mediaStyle ? ` style="${mediaStyle}"` : "";
  return item.kind === "video"
    ? `<video src="${item.src}" muted autoplay playsinline preload="metadata" controls${positionStyle}></video>`
    : `<button class="project-media-zoom" type="button" data-full-src="${item.src}" aria-label="Open photo full resolution"><img src="${item.src}" alt=""${positionStyle}></button>`;
}

function renderProjectMedia() {
  if (!activeProject || !imageLightboxImage || !imageLightboxVideo || !supportingMedia) return;
  const media = getProjectMedia(activeProject);
  const item = media[activeImageIndex];
  if (!item) return;

  imageLightboxVideo.pause();
  imageLightboxVideo.removeAttribute("src");
  imageLightboxVideo.innerHTML = "";
  imageLightboxVideo.hidden = true;
  imageLightboxImage.hidden = true;

  if (item.kind === "video") {
    imageLightboxVideo.src = item.src;
    imageLightboxVideo.muted = true;
    imageLightboxVideo.autoplay = true;
    imageLightboxVideo.controls = true;
    imageLightboxVideo.style.objectPosition = item.position || "";
    imageLightboxVideo.style.transform = item.scale ? `scale(${item.scale})` : "";
    imageLightboxVideo.hidden = false;
    imageLightboxVideo.load();
    imageLightboxVideo.play().catch(() => {});
  } else {
    imageLightboxImage.src = item.src;
    imageLightboxImage.alt = `${activeProject.title} photo ${activeImageIndex + 1}`;
    imageLightboxImage.style.objectPosition = item.position || "";
    imageLightboxImage.hidden = false;
  }

  const supportingItems = media.slice(1);
  const points = activeProject.points || [];
  const storySections = activeProject.sections || Array.from({ length: Math.max(points.length, supportingItems.length) }, (_, index) => ({
    text: points[index] || "",
    media: supportingItems[index]
  }));

  supportingMedia.innerHTML = "";

  if (sheetPoints) {
    sheetPoints.innerHTML = storySections.map((section, index) => {
      return `<section class="project-story-row${index % 2 ? " reverse" : ""}${activeProject.layout === "stacked" ? " stacked" : ""}">
        <div class="project-story-copy">
          ${section.text ? `<p>${section.text}</p>` : ""}
        </div>
        ${section.media ? `<div class="project-story-media">${renderMediaItem(section.media)}</div>` : ""}
      </section>`;
    }).join("");
  }

  if (extraMedia) {
    const bottomItems = activeProject.extraMedia || [];
    extraMedia.innerHTML = bottomItems.map((extraItem) => {
      return `<div class="project-extra-item">${renderMediaItem(extraItem)}</div>`;
    }).join("");
  }
}

function renderProjectVideos(project) {
  if (!sheetVideos) return;
  sheetVideos.innerHTML = "";
}

function openProject(projectId) {
  const sheet = projectSheets[projectId];
  if (!sheet || !imageLightbox || !imageLightboxImage || !sheetTitle || !sheetDescription || !sheetRole || !sheetTools || !sheetPoints) return;
  activeProject = sheet;
  activeProjectId = projectId;
  activeImageIndex = 0;
  renderProjectMedia();
  sheetRole.textContent = sheet.role;
  sheetTitle.textContent = sheet.title;
  sheetDescription.textContent = sheet.description;
  sheetTools.innerHTML = sheet.tools.map((tool) => `<span>${tool}</span>`).join("");
  renderProjectVideos(sheet);
  imageLightbox.classList.add("open");
}

function navigateProject(direction) {
  if (!activeProjectId || !projectIds.length) return;
  const currentIndex = projectIds.indexOf(activeProjectId);
  const nextIndex = (currentIndex + direction + projectIds.length) % projectIds.length;
  openProject(projectIds[nextIndex]);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFullResolutionImage();
    closePreview();
    closeProjectPreview();
  }
  if (event.key === "ArrowLeft") {
    if (projectFullscreen && projectFullscreen.classList.contains("open")) {
      navigateFullResolutionImage(-1);
    } else if (imageLightbox && imageLightbox.classList.contains("open")) {
      navigateProject(-1);
    }
  }
  if (event.key === "ArrowRight") {
    if (projectFullscreen && projectFullscreen.classList.contains("open")) {
      navigateFullResolutionImage(1);
    } else if (imageLightbox && imageLightbox.classList.contains("open")) {
      navigateProject(1);
    }
  }
});

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProject(button.dataset.project);
  });
});

function closeProjectPreview() {
  if (!imageLightbox || !imageLightboxImage) return;
  imageLightbox.classList.remove("open");
  imageLightboxImage.src = "";
  imageLightboxImage.hidden = false;
  if (imageLightboxVideo) {
    imageLightboxVideo.pause();
    imageLightboxVideo.removeAttribute("src");
    imageLightboxVideo.innerHTML = "";
    imageLightboxVideo.hidden = true;
  }
  if (sheetVideos) {
    sheetVideos.querySelectorAll("video").forEach((video) => video.pause());
    sheetVideos.innerHTML = "";
  }
  if (extraMedia) {
    extraMedia.querySelectorAll("video").forEach((video) => video.pause());
    extraMedia.innerHTML = "";
  }
  if (supportingMedia) {
    supportingMedia.innerHTML = "";
  }
  activeProject = null;
  activeProjectId = "";
  activeImageIndex = 0;
}

if (imageLightboxClose) {
  imageLightboxClose.addEventListener("click", closeProjectPreview);
}

if (projectFullscreenClose) {
  projectFullscreenClose.addEventListener("click", closeFullResolutionImage);
}

if (projectPrevButton) {
  projectPrevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    navigateProject(-1);
  });
}

if (projectNextButton) {
  projectNextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    navigateProject(1);
  });
}

if (fullscreenPrevButton) {
  fullscreenPrevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    navigateFullResolutionImage(-1);
  });
}

if (fullscreenNextButton) {
  fullscreenNextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    navigateFullResolutionImage(1);
  });
}

if (projectFullscreen) {
  projectFullscreen.addEventListener("click", (event) => {
    if (event.target === projectFullscreen) closeFullResolutionImage();
  });
}

if (imageLightboxImage) {
  imageLightboxImage.addEventListener("click", (event) => {
    event.stopPropagation();
    openFullResolutionImage(imageLightboxImage.getAttribute("src"), activeProject ? `${activeProject.title} photo` : "Project photo");
  });
}

if (imageLightbox) {
  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) closeProjectPreview();
  });

  imageLightbox.addEventListener("click", (event) => {
    const zoomButton = event.target.closest(".project-media-zoom");
    if (!zoomButton) return;
    event.stopPropagation();
    openFullResolutionImage(zoomButton.dataset.fullSrc, activeProject ? `${activeProject.title} photo` : "Project photo");
  });
}
