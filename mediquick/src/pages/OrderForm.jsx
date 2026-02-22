<div className="min-h-screen bg-gray-100 p-10">

  <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

    <h2 className="text-2xl font-bold text-[#2D1B4E] mb-6">
      Create New Order
    </h2>

    <form className="space-y-5">

      <div>
        <label className="block text-gray-600 mb-1">Product Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Quantity</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Price</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#7C3AED] text-white py-3 rounded-xl font-semibold hover:bg-[#8B5CF6] transition shadow-lg"
      >
        Submit Order
      </button>

    </form>
  </div>
</div>