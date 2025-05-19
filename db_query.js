db.sales.aggregate([
  // Unwind the items array
  {
    $unwind: "$items",
  },
  // Add computed fields
  {
    $addFields: {
      itemRevenue: { $multiply: ["$items.quantity", "$items.price"] },
      yearMonth: {
        $$dateFromString: { format: "%Y-%m", date: "$date" },
      },
    },
  },
  // Group by store and month to sum up revenue and prepare for average price
  {
    $group: {
      _id: {
        store: "$store",
        month: "$yearMonth",
      },
      totalRevenue: { $sum: "$itemRevenue" },
      totalQuantity: { $sum: "$items.quantity" },
      totalWeightedPrice: {
        $sum: {
          $multiply: ["$items.quantity", "$items.price"],
        },
      },
    },
  },
  // Project final fields with computed average price
  {
    $project: {
      _id: 0,
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: {
        $cond: [
          { $eq: ["$totalQuantity", 0] },
          0,
          { $divide: ["$totalWeightedPrice", "$totalQuantity"] },
        ],
      },
    },
  },
  // Sort by store and month
  {
    $sort: {
      store: 1,
      month: 1,
    },
  },
]);
