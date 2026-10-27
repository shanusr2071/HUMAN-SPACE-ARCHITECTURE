import nordicImg from '../assets/gallery-1-nordic.jpg';
import duneImg from '../assets/gallery-2-dune.jpg';
import cliffImg from '../assets/gallery-3-cliff.jpg';
import helixImg from '../assets/gallery-4-helix.jpg';
import canopyImg from '../assets/gallery-5-canopy.jpg';

export const projects = [
  {
    id: 'nordic-wave-pavilion',
    index: '01',
    title: 'The Nordic Wave Pavilion',
    location: 'Tromsø, Norway',
    category: 'Cultural & Civic',
    year: '2025',
    area: '4,800 m²',
    status: 'Completed',
    materials: 'Glulam Timber, Low-Iron Glass, Local Granite',
    heroImage: nordicImg,
    objectPosition: 'center 40%',
    layoutType: 'landscape-dominant',
    quote: 'Architecture defined as an artificial landscape conforming to the rhythm of the Arctic tides.',
    description: 'An undulating timber and structural glass cultural pavilion responding directly to the fjord coastline. Designed with laminated Scandinavian spruce arches that echo glacial topography.',
    gallery: [nordicImg, duneImg]
  },
  {
    id: 'dune-observatory',
    index: '02',
    title: 'The Dune Observatory',
    location: 'Liwa Desert, Abu Dhabi',
    category: 'Research & Science',
    year: '2024',
    area: '7,200 m²',
    status: 'Commissioned',
    materials: 'Stabilized Rammed Earth, Post-Tensioned Concrete',
    heroImage: duneImg,
    objectPosition: 'center 45%',
    layoutType: 'split-monolith',
    quote: 'Thermal mass sculpted into passive wind scoops, harnessing celestial alignment and desert breezes.',
    description: 'Emerging seamlessly from desert dunes, this astronomical research facility integrates rammed earth thermal mass with aerodynamic cooling channels.',
    gallery: [duneImg, cliffImg]
  },
  {
    id: 'fjord-cliff-residence',
    index: '03',
    title: 'Cantilevered Fjord Studio',
    location: 'Hardangerfjord, Norway',
    category: 'Residential',
    year: '2024',
    area: '620 m²',
    status: 'Completed',
    materials: 'Board-Formed Concrete, Anodized Bronze, Triple Glazing',
    heroImage: cliffImg,
    objectPosition: 'center 35%',
    layoutType: 'cantilever-focus',
    quote: 'A bold volumetric cantilever projected over sheer bedrock, transforming gravity into an experiential threshold.',
    description: 'A monolithic cast-concrete volume boldly cantilevered over sheer fjord bedrock, capturing panoramic mountain vistas through floor-to-ceiling high-efficiency glazing.',
    gallery: [cliffImg, helixImg]
  },
  {
    id: 'solaris-waterfront-tower',
    index: '04',
    title: 'Solaris Spiral Tower',
    location: 'Copenhagen, Denmark',
    category: 'Mixed-Use & Urbanism',
    year: '2025',
    area: '34,000 m²',
    status: 'Under Construction',
    materials: 'Recycled Aluminum Ribbons, Photovoltaic Glass Facade',
    heroImage: helixImg,
    objectPosition: 'center 50%',
    layoutType: 'vertical-spiral',
    quote: 'Extending Copenhagen’s public harbor boardwalk into a continuous, ascending vertical promenade.',
    description: 'A twisting waterfront landmark wrapped in public pedestrian ribbons and stepped botanical terraces, extending the city’s public realm vertically into the skyline.',
    gallery: [helixImg, canopyImg]
  },
  {
    id: 'bio-canopy-forum',
    index: '05',
    title: 'Bio-Canopy Ecological Forum',
    location: 'Zurich, Switzerland',
    category: 'Institutional',
    year: '2023',
    area: '8,900 m²',
    status: 'Completed',
    materials: 'Cross-Laminated Timber (CLT), ETFE Cushions',
    heroImage: canopyImg,
    objectPosition: 'center 50%',
    layoutType: 'landscape-dominant',
    quote: 'A hyper-efficient climatic envelope testing regenerative biophilic envelopes for cold-climate research.',
    description: 'A modular, living research canopy exploring carbon-negative spatial envelopes and regenerative microclimates for next-generation urban architecture.',
    gallery: [canopyImg, nordicImg]
  }
];
