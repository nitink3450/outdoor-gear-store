// Mock data for the below-fold product details section

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface ProductDetailData {
  specifications: ProductSpec[];
  reviews: ProductReview[];
}

export const PRODUCT_DETAILS_DATA: ProductDetailData = {

  specifications: [
    { label: "Material", value: "Ripstop Nylon / Merino Wool Blend" },
    { label: "Weight", value: "320g (Size M)" },
    { label: "Water Resistance", value: "DWR Coated — 10,000mm Rating" },
    { label: "Breathability", value: "15,000g/m²/24hr MVTR" },
    { label: "UV Protection", value: "UPF 50+" },
    { label: "Temperature Range", value: "-5°C to 25°C" },
    { label: "Pockets", value: "2 Zippered Hand, 1 Interior, 1 Chest" },
    { label: "Closure", value: "YKK® Aquaguard Zipper" },
    { label: "Care", value: "Machine Wash Cold, Hang Dry" },
    { label: "Origin", value: "Designed in Norway, Made in Portugal" },
  ],

  reviews: [
    {
      id: 1,
      author: "Alex M.",
      rating: 5,
      date: "2 weeks ago",
      title: "Absolute game-changer for alpine treks",
      body: "Wore this through a 4-day traverse in the Dolomites. Handled rain, wind, and sun without missing a beat. The fit is incredible — not too tight, not too loose. Best gear purchase I've made this year.",
    },
    {
      id: 2,
      author: "Jordan K.",
      rating: 4,
      date: "1 month ago",
      title: "Great quality, runs slightly large",
      body: "Material quality is top-notch and the DWR coating really works. I'd recommend sizing down if you're between sizes. The chest pocket is a nice touch for quick access to your phone on the trail.",
    },
    {
      id: 3,
      author: "Sam R.",
      rating: 5,
      date: "3 weeks ago",
      title: "Perfect for daily wear too",
      body: "I originally bought this for hiking but honestly I wear it everywhere now. The design is clean enough for the office and tough enough for weekend adventures. Ventilation zones actually make a difference.",
    },
  ],
};
