var express = require("express");
var router = express.Router();
const client = require("../db");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/policy_id/", async function (req, res, next) {
  try {
    result = await client.query("SELECT * FROM Policy WHERE Policy_id=$1;", [
      req.query.policy_id,
    ]);
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

router.get("/customer_id/", async function (req, res, next) {
  try {
    result = await client.query(
      "SELECT * FROM Policy WHERE policy_Id IN (SELECT policy_id FROM CustomerPolicy WHERE customer_id=$1);",
      [req.query.customer_id]
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

router.get("/sales/", async function (req, res, next) {
  try {
    result = await client.query(
      "SELECT  c.customer_region, DATE_PART('month',date_of_purchase) AS Month_of_year,COUNT(*) FROM policy p JOIN customerpolicy cp ON p.policy_id = cp.policy_id JOIN customer c ON cp.customer_id = c.customer_id WHERE c.customer_region = $1 GROUP BY DATE_PART('month',date_of_purchase),c.customer_region",
      [req.query.region]
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

router.patch("/edit/", jsonParser, async function (req, res, next) {
  try {
    result = await client.query(
      "UPDATE policy SET bodily_injury_liability = $1 , personal_injury_protection = $2 , property_damage_liability = $3 , premium = $4 , collision=$5 , comprehensive=$6,fuel=$7 WHERE policy_id=$8 RETURNING *",
      [
        req.body.bodily_injury_liability,
        req.body.personal_injury_protection,
        req.body.property_damage_liability,
        req.body.premium,
        req.body.collision,
        req.body.comprehensive,
        req.body.fuel,
        req.query.policy_id,
      ]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
