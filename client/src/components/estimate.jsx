import React, { useState, useEffect } from "react";

function Estimate() {
  // State for form inputs
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [owner, setOwner] = useState("");

  // State for dropdown options
  const [brands, setBrands] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [transmissions, setTransmissions] = useState([]);

  // State for API response
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Base URL for the Flask API
  const API_URL = "http://127.0.0.1:5000";

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const brandRes = await fetch(`${API_URL}/get_brand_names`);
        const brandData = await brandRes.json();
        setBrands(brandData.brands || []);

        const fuelRes = await fetch(`${API_URL}/get_fuel_types`);
        const fuelData = await fuelRes.json();
        setFuelTypes(fuelData.fuel_types || []);

        const transRes = await fetch(`${API_URL}/get_transmission_types`);
        const transData = await transRes.json();
        setTransmissions(transData.transmission_types || []);
      } catch (err) {
        console.error("Failed to fetch dropdown data:", err);
        setError(
          "Could not load selection options. Please ensure the server is running."
        );
      }
    };
    fetchDropdownData();
  }, []);

  // Handle form submission to predict price
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEstimatedPrice(null);
    setError("");

    if (!brand || !year || !fuelType || !transmission || !kmDriven || !owner) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("year", year);
    formData.append("fuel_type", fuelType);
    formData.append("transmission", transmission);
    formData.append("km_driven", kmDriven);
    formData.append("owner", owner);

    try {
      const response = await fetch(`${API_URL}/predict_car_price`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.error || `HTTP error! Status: ${response.status}`
        );
      }

      const result = await response.json();
      setEstimatedPrice(result.estimated_price);
    } catch (err) {
      console.error("Prediction API error:", err);
      setError(err.message || "An error occurred while estimating the price.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      {/* Soft blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[32rem] w-[32rem] rounded-full bg-sky-200/40 blur-3xl" />

      {/* Grid accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,.06)_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10">
        <div className="w-full">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_10px_40px_-10px_rgba(2,6,23,0.15)] backdrop-blur-md md:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                Price Estimator
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Used Car Price Estimator
              </h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Fill the details below and get a{" "}
                <span className="font-semibold">fast, fair</span> estimate.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {/* Brand */}
              <div className="group">
                <label
                  htmlFor="brand"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Brand
                </label>
                <div className="relative">
                  <select
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
                  >
                    <option value="" disabled>
                      Select Brand
                    </option>
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b.charAt(0).toUpperCase() + b.slice(1)}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                  </svg>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Choose the manufacturer.
                </p>
              </div>

              {/* Year */}
              <div className="group">
                <label
                  htmlFor="year"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Year of Manufacture
                </label>
                <input
                  type="number"
                  id="year"
                  placeholder="e.g., 2018"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Enter a 4-digit year.
                </p>
              </div>

              {/* Fuel Type */}
              <div className="group">
                <label
                  htmlFor="fuelType"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Fuel Type
                </label>
                <div className="relative">
                  <select
                    id="fuelType"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
                  >
                    <option value="" disabled>
                      Select Fuel Type
                    </option>
                    {fuelTypes.map((ft) => (
                      <option key={ft} value={ft}>
                        {ft.charAt(0).toUpperCase() + ft.slice(1)}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                  </svg>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Petrol, Diesel, CNG, Electric, etc.
                </p>
              </div>

              {/* Transmission */}
              <div className="group">
                <label
                  htmlFor="transmission"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Transmission
                </label>
                <div className="relative">
                  <select
                    id="transmission"
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
                  >
                    <option value="" disabled>
                      Select Transmission
                    </option>
                    {transmissions.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                  </svg>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Manual or Automatic.
                </p>
              </div>

              {/* Kilometers Driven */}
              <div className="group">
                <label
                  htmlFor="kmDriven"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Kilometers Driven
                </label>
                <input
                  type="number"
                  id="kmDriven"
                  placeholder="e.g., 50000"
                  value={kmDriven}
                  onChange={(e) => setKmDriven(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Total distance the car has run.
                </p>
              </div>

              {/* Owner */}
              <div className="group">
                <label
                  htmlFor="owner"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Number of Previous Owners
                </label>
                <input
                  type="number"
                  id="owner"
                  placeholder="e.g., 1"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200"
                />
                <p className="mt-1 text-xs text-slate-500">
                  0 for first owner, 1 for second, etc.
                </p>
              </div>

              {/* Submit */}
              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-transform duration-200 hover:scale-[1.01] hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:scale-100 disabled:bg-slate-400"
                >
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
                  )}
                  {loading ? "Estimating..." : "Estimate Price"}
                </button>
              </div>
            </form>

            {/* Feedback: error / result */}
            <div className="mt-6 space-y-4 text-center" aria-live="polite">
              {error && (
                <div className="mx-auto max-w-xl rounded-2xl border-l-4 border-red-500 bg-red-50 px-4 py-3 text-left text-red-700">
                  <p className="text-sm font-semibold">Something went wrong</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {estimatedPrice !== null && (
                <div className="mx-auto max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-emerald-800 shadow-sm">
                  <h2 className="text-2xl font-extrabold tracking-tight text-emerald-900">
                    Estimated Price:
                    <span className="ml-2 whitespace-nowrap">
                      ₹{Number(estimatedPrice).toLocaleString("en-IN")}
                    </span>
                  </h2>
                  <p className="mt-1 text-sm text-emerald-700">
                    This is a quick estimate based on your inputs.
                  </p>
                </div>
              )}
            </div>

            {/* Decorative line art */}
            <div className="mt-8 flex justify-center opacity-80">
              <svg
                viewBox="0 0 500 120"
                className="h-20 w-full max-w-lg text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M20 90 C60 70, 120 60, 160 60 C200 60, 220 80, 260 80 C300 80, 340 60, 380 60 C420 60, 460 70, 480 90" />
                <circle cx="160" cy="90" r="10" />
                <circle cx="360" cy="90" r="10" />
                <path d="M120 75 L200 75 M240 75 L320 75" />
              </svg>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="pointer-events-none mx-auto mt-8 w-full max-w-5xl opacity-70">
            <svg
              viewBox="0 0 1440 120"
              className="h-16 w-full text-indigo-100"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0,64L48,74.7C96,85,192,107,288,106.7C384,107,480,85,576,80C672,75,768,85,864,85.3C960,85,1056,75,1152,74.7C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Estimate;