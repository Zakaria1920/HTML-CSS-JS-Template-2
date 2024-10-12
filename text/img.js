var cl = cloudinary.Cloudinary.new({ cloud_name: "dbhxstvst" });

(async function () {
  // Configuration
  cl.config({
    cloud_name: "dbhxstvst",
    api_key: "933891135992451",
    api_secret: "<Tz_NzSSNkmaEHFNLnfgddxIthAo>", // Click 'View API Keys' above to copy your API secret
  });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cl.url("skills-2_xf9wpz", {});

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cl.url("skills-2_xf9wpz", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(autoCropUrl);
})();
