// Single source for every project: the research grid, project pages and hero read from here.
// newBlock: research page starts a new block of tiles here (keeps the layout above unchanged).
// galleryCols: fixed number of gallery columns (default: as many as fit).
// wide: gallery entries that span the full gallery width.
// tileMedia: research-page tile visual, if different from media[0].
// heroMedia / leadWidth: optional per-project overrides for the home slide and the lead size.
// media: first entry is the tile/lead visual. "v:" = video (media/<name>.mp4 + .jpg poster), else media/<name>.jpg.
// text: short story, papers woven in as links. Empty text = "to come" (Boss to supply).
const PROJECTS = [
  {
    slug: "giga-voxel-wing",
    title: "Giga-scale structures",
    area: "High-performance computing",
    media: ["aircraft-wing", "suspension-bridge-natcomm", "v:rings-anim", "levelset-bridges"],
    wide: ["levelset-bridges"], // three length scales side by side
    text: `What does a full-scale aircraft wing look like when every voxel of material is free to move?
      Optimising the internal structure of a wing similar to a Boeing 777's with 1.1 billion voxels on a supercomputer
      gives an organic, bone-like layout and an estimated 2 to 5 percent mass saving, see
      <a href="https://doi.org/10.1038/nature23911">Nature (2017)</a>. The same approach applied to bridge girders points to
      weight savings above 28 percent for super-long suspension bridges, see
      <a href="https://doi.org/10.1038/s41467-020-16599-6">Nature Communications (2020)</a>. The wing was computed on a supercomputer with
      our open-source <a href="https://doi.org/10.1007/s00158-014-1157-0">PETSc framework</a>, which also handles hundreds of
      millions of local stress constraints, see <a href="https://doi.org/10.1002/nme.6548">IJNME (2020)</a>, and crisp
      level-set designs, see <a href="https://doi.org/10.1007/s00158-021-02904-4">SMO (2021)</a>. The current effort is to make
      the supercomputer unnecessary: 65 million elements now run on a single GPU, see
      <a href="https://doi.org/10.1016/j.cma.2023.116043">CMAME (2023)</a>, and a matrix-free MATLAB code with non-dyadic
      multigrid handles more than 100 million on a desktop PC, see
      <a href="https://doi.org/10.1007/s00158-025-04127-3">Structural and Multidisciplinary Optimization (2025)</a>.`,
  },
  {
    slug: "shells",
    title: "Shell and lattice structures",
    area: "Multiscale design",
    // shell-thickness-anim-1/2: shell thickness optimisation, side by side; paper link to follow (Boss, 2026-10-09).
    media: ["shell-structure", "v:shell-thickness-anim-1", "v:shell-thickness-anim-2", "lattice-tower", "dehomo-cantilever-2x2", "dehomo-frame-field"],
    wide: ["lattice-tower", "dehomo-cantilever-2x2", "dehomo-frame-field"], // stacked, full gallery width
    galleryCols: 2, // the two animations share one row, centred
    text: `Optimal structures are often made of thin, curved plates. Homogenisation-based topology optimisation finds
      their layout on a coarse grid, and stream surfaces traced along the optimal directions turn it into a detailed
      shell and lattice structure, here a twisted tower and a jet engine bracket, at a fraction of the cost of a
      full-resolution solution, see <a href="https://doi.org/10.1016/j.tws.2023.111427">Thin-Walled Structures (2024)</a>.
      Borrowing frame fields from computer graphics, the laminates can be placed evenly without parametrising the domain, see
      <a href="https://doi.org/10.1145/3516522">ACM Transactions on Graphics (2022)</a>.`,
  },
  {
    slug: "heat-sinks",
    title: "Flow and heat",
    area: "Thermofluidics",
    media: ["v:heat-sink-velocity", "v:heat-sink-temperature", "heat-sinks-coral"],
    heroFit: "large", // home slideshow: shown whole with a slimmer margin than the default "contain"
    heroMedia: "v:heat-sink-temperature", // home slideshow shows this instead of media[0]
    leadWidth: 1100, // lead video at the same size as the gallery video below
    text: `A passive heat sink is cooled by the air flow its own heat sets in motion. Solving the fully coupled flow and
      heat transfer with up to 330 million unknowns lets topology optimisation design such sinks in three dimensions, see
      <a href="https://doi.org/10.1016/j.ijheatmasstransfer.2016.05.013">International Journal of Heat and Mass Transfer (2016)</a>.
      The optimised sinks branch more as the flow gets stronger, the opposite of what two-dimensional designs suggest.`,
  },
  {
    slug: "bone-like-infill",
    title: "Bone-like infill",
    area: "Additive manufacturing",
    media: ["bone-infill-femur-tooth", "infill-beam-test", "fuselage-infill"],
    text: `Bone is a dense shell around a light, porous interior. Limiting how much material may gather around each
      point lets topology optimisation grow the same kind of porous infill inside 3D-printed parts: light, stiff
      and robust, see <a href="https://doi.org/10.1109/tvcg.2017.2655523">IEEE TVCG (2017)</a>. It builds on coating-based
      optimisation, see <a href="https://doi.org/10.1016/j.cma.2015.02.011">CMAME (2015)</a>, and printed beams with optimised
      infill carry markedly higher buckling loads, see <a href="https://doi.org/10.1016/j.eng.2016.02.006">Engineering (2016)</a>.
      The approach is not limited to bone: it also gives lightweight, fail-safe stiffening of large thin-walled
      structures such as an aircraft fuselage, see <a href="https://doi.org/10.1016/j.tws.2020.107349">Thin-Walled Structures (2020)</a>.`,
  },
  {
    slug: "fluid-structure",
    title: "Fluid-structure interaction",
    area: "Contact mechanics",
    media: ["v:fsi-streamlines"],
    text: `A soft valve closing in a flowing fluid bends far and presses against its seat. Combining an immersed
      solid on a fixed grid with third-medium contact captures flow, large deformation and contact together, without
      remeshing or explicit contact detection. Ongoing work with Jure Čas and Casper Schousboe Andreasen, paper in preparation.`,
  },
  {
    slug: "hearing-instruments",
    title: "Hearing instruments",
    area: "Vibroacoustics",
    media: ["v:hearing-aid-anim-1", "v:hearing-aid-anim-2", "hearing-aid-model"],
    text: `Inside a hearing aid, sound, structure and air are tightly coupled at millimetre scale.
      Three-dimensional vibroacoustic topology optimisation with cut elements designs the internal parts
      directly on the device geometry, see <a href="https://doi.org/10.1016/j.jsv.2022.116984">Journal of Sound and Vibration (2022)</a>.`,
  },
  {
    slug: "spinal-cages",
    title: "Patient-specific spinal cages",
    area: "Medical devices",
    media: ["spinal-cage-overview", "spinal-cages-printed"],
    text: `Spinal fusion cages that match both the anatomy and the mechanics of the individual patient, designed by
      full-scale topology optimisation and 3D printed, see
      <a href="https://doi.org/10.1016/j.jmbbm.2024.106695">JMBBM (2024)</a> and the in silico testing in
      <a href="https://doi.org/10.3389/fbioe.2024.1347961">Frontiers in Bioengineering and Biotechnology (2024)</a>.`,
  },
  {
    slug: "waveguides",
    title: "Microwave, RF and optical devices",
    area: "Wave control",
    media: ["v:waveguide-anim", "v:optical-waveguide", "waveguide-filter-copper-photo", "pcb-filter-photo", "wpt-setup", "wpt-coil"],
    wide: ["v:optical-waveguide", "wpt-coil"], // photonics video and the three coil views span the full gallery width
    text: `Metal inserts shaped by topology optimisation turn a plain rectangular waveguide into a compact filter.
      The designs are machined in copper and verified by measurement, see
      <a href="https://doi.org/10.1002/nme.5551">IJNME (2017)</a> and
      <a href="https://doi.org/10.1002/mop.31741">Microwave and Optical Technology Letters (2019)</a>. It grew out of
      the PhD work on metallic microwave devices, see <a href="https://doi.org/10.1002/nme.2837">IJNME (2010)</a>, which
      also optimised resonant coils for wireless energy transfer. The same ideas steer light: stochastic topology
      optimisation gives photonic components that stay robust to fabrication errors, see
      <a href="https://doi.org/10.1364/JOSAB.584921">Journal of the Optical Society of America B (2026)</a>.`,
  },
  {
    slug: "wind-turbine-rotor",
    title: "Rotating machines",
    area: "Energy systems",
    media: ["wind-turbine-rotor", "labyrinth-seal-3d"],
    wide: ["labyrinth-seal-3d"],
    text: `Direct-drive wind turbine generators are heavy, and much of that weight is structure. Topology optimisation
      of the rotor of a 5 MW generator cuts its structural mass by 54 to 67 percent and raises power density by up to
      25 percent, with deflections verified on 3D-printed rotors, see
      <a href="https://doi.org/10.1016/j.seta.2023.103254">Sustainable Energy Technologies and Assessments (2023)</a>.
      Stress-constrained flywheel rotors store up to 15.8 percent more energy per kilogram, see
      <a href="https://doi.org/10.1016/j.est.2023.106733">Journal of Energy Storage (2023)</a> and
      <a href="https://doi.org/10.1007/s00158-023-03693-8">SMO (2023)</a>, and labyrinth seals that limit leakage between
      rotor and stator can be designed by topology optimisation too, see <a href="https://doi.org/10.1016/j.cma.2023.116716">CMAME (2023)</a>.`,
  },
  {
    slug: "surgical-incisions",
    title: "Surgical incisions",
    area: "Surgical procedures",
    media: ["surgical-procedure-overview", "v:suture-optimisation", "v:incision-90-90", "v:incision-60-60", "v:wound-closure"],
    wide: ["v:suture-optimisation"], // optimisation history: strain field, convergence, suture layout
    text: `Where and how a surgeon cuts and sutures changes how tissue deforms and heals. Incisions and sutures modelled
      on fixed structured grids make such questions fast to explore, see
      <a href="https://doi.org/10.1016/j.jmbbm.2024.106692">JMBBM (2024)</a>. Where to place the sutures is itself a
      design problem: topology optimisation of the suture distribution closes the wound while keeping peak tissue strain low.`,
  },
  {
    slug: "vibroacoustics",
    newBlock: true, // research page: starts a new block below the original ten tiles
    title: "Vibroacoustics",
    area: "Acoustics",
    media: ["lens-render", "v:lens-optimisation-anim", "lens-printed", "loudspeaker-cabinets", "vibroacoustic-spl", "v:viscothermal-anim"],
    wide: ["vibroacoustic-spl", "v:viscothermal-anim"],
    text: `Sound and vibration are two sides of the same design problem. Shape optimisation evens out the sound field
      in front of a loudspeaker, see <a href="https://doi.org/10.1007/s00158-022-03451-2">SMO (2022)</a>, and a 3D-printed
      acoustic lens designed this way is validated by measurement, see <a href="https://doi.org/10.1121/10.0017859">JASA (2023)</a>.
      Topology optimisation designs sandwich cores that block sound transmission, see
      <a href="https://doi.org/10.1016/j.jsv.2023.117959">Journal of Sound and Vibration (2023)</a>, and metamaterials that stop
      sound and vibration in the same frequency band, see <a href="https://doi.org/10.1016/j.cma.2025.117744">CMAME (2025)</a>.
      At the smallest scales, viscous and thermal losses in thin air layers become part of the design, see
      <a href="https://doi.org/10.1007/s00158-026-04346-2">SMO (2026)</a>.`,
  },
  {
    slug: "mems",
    title: "MEMS",
    area: "Microsystems",
    media: ["mems-resonators",
      "v:mems-single-standard-drive", "v:mems-single-standard-sense", "v:mems-fork-standard-drive", "v:mems-fork-standard-sense",
      "v:mems-single-anim", "v:mems-fork-anim"],
    galleryCols: 2, // standard single mass and tuning fork (drive, sense), then the optimised designs
    text: `A MEMS gyroscope senses rotation through a tiny structure vibrating at prescribed frequencies. Topology
      optimisation designs its suspension directly, maximising the response to rotation while hitting target resonance
      frequencies and a minimum feature size for manufacturing, see <a href="https://doi.org/10.1007/s00158-020-02595-3">SMO (2020)</a>.
      With 3D shell models and reduced-order dynamics, the same method designs industrially relevant resonators with
      prescribed drive and sense frequencies, see <a href="https://doi.org/10.1016/j.euromechsol.2021.104352">European Journal of Mechanics A/Solids (2021)</a>.`,
  },
  {
    slug: "interactive",
    title: "Interactive and computational design",
    area: "Design tools and teaching",
    media: ["v:topopt-app-video", "dsc-furniture", "dsc-animals"],
    text: `Topology optimisation in your hand: the TopOpt app lets anyone move loads and supports and watch the optimal
      structure evolve in real time, see <a href="https://doi.org/10.1007/s00158-012-0827-z">SMO (2012)</a>, and the 3D version
      brings this to tablets and desktops, see <a href="https://doi.org/10.1007/s00158-014-1214-8">SMO (2014)</a>. The TopOpt Game
      turns it into a challenge, and players score higher the more they play, see
      <a href="https://doi.org/10.1007/s00158-016-1443-0">SMO (2016)</a>. With an explicit surface mesh, shape and topology
      optimisation also generates 3D models such as chairs and tables that are both functional and pleasing to look at, see
      <a href="https://doi.org/10.1016/j.cag.2014.09.021">Computers &amp; Graphics (2014)</a>.
      The apps are free: more information and downloads on the
      <a href="https://www.topopt.mek.dtu.dk/apps-and-software">TopOpt group website</a>.
      <a class="app-icons" href="https://www.topopt.mek.dtu.dk/apps-and-software" aria-label="TopOpt apps"><img src="media/app-icon-1.jpg" alt=""><img src="media/app-icon-2.jpg" alt=""><img src="media/app-icon-3.jpg" alt=""><img src="media/app-icon-4.jpg" alt=""><img src="media/app-icon-5.jpg" alt=""></a>`,
  },
  {
    slug: "machine-learning",
    title: "Machine learning",
    area: "Learning and optimisation",
    media: ["ml-dehomo-lead", "ml-dehomo-bracket", "ml-dehomo-pipeline", "ml-dehomo-postprocess", "ml-dehomo-cantilevers"],
    wide: ["ml-dehomo-bracket", "ml-dehomo-pipeline", "ml-dehomo-postprocess", "ml-dehomo-cantilevers"], // stacked
    text: `Can machine learning replace the optimiser? A critical review of neural networks in topology optimisation
      separates real progress from hype, see <a href="https://doi.org/10.1007/s00158-022-03347-1">SMO (2022)</a>. Where learning
      does help: a convolutional neural network turns coarse multiscale results into fine lamination patterns, see
      <a href="https://doi.org/10.1016/j.cma.2021.114197">CMAME (2021)</a>, reinforcement learning agents learn to design
      structures in the open SOgym environment, see <a href="https://doi.org/10.1016/j.engappai.2025.112273">EAAI (2025)</a>,
      and instance segmentation turns optimised density fields back into editable geometry, see
      <a href="https://doi.org/10.1016/j.engappai.2024.109732">EAAI (2024)</a>.`,
  },
  {
    slug: "fracture-impact",
    title: "Fracture and crashworthiness",
    area: "Impact and fracture",
    media: ["fracture-collage", "v:drop-test-optimised-anim", "lattice-fracture", "knee-contact", "impact-cantilever"],
    wide: ["v:drop-test-optimised-anim", "lattice-fracture", "knee-contact", "impact-cantilever"], // stacked, each at its natural size
    text: `How should a structure be built to survive a crash or resist a crack? Topology optimisation of transient
      impacts with friction designs a casing that protects a falling payload when it hits the ground, see
      <a href="https://doi.org/10.1002/nme.6756">IJNME (2021)</a>, and our open-source framework makes such transient
      problems large-scale, see <a href="https://doi.org/10.1007/s00158-022-03312-y">SMO (2022)</a>. For architected
      lattice materials, optimising the fracture toughness shows that classical triangular and Kagome lattices remain
      remarkably tough when compared on a fair, unit-cell based measure, see
      <a href="https://doi.org/10.1016/j.ijsolstr.2026.113910">International Journal of Solids and Structures (2026)</a>.
      A meshfree collocation method resolves strongly nonlinear contact with friction, shown here for the knee joint, see
      <a href="https://doi.org/10.1016/j.triboint.2026.112095">Tribology International (2026)</a>.`,
  },
];

// Home page slideshow: slugs in order.
const HERO = ["giga-voxel-wing", "heat-sinks", "bone-like-infill", "hearing-instruments"];
