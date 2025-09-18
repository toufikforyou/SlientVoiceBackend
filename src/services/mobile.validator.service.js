import ApiResponse from "../models/api.response.model.js";

const PHONE_REGEX = {
  INTERNATIONAL: /^(?:\+?\d{1,4}[-.\s]?)?\(?\d{1,}\)?[-.\s]?\d{1,}$/,
  COUNTRY_CODES:
    /^\+(?:1|7|20|27|30|31|32|33|34|36|39|40|41|43|44|45|46|47|48|49|51|52|53|54|55|56|57|58|60|61|62|63|64|65|66|81|82|84|86|90|91|92|93|94|95|98|212|213|216|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|250|251|252|253|254|255|256|257|258|260|261|262|263|264|265|266|267|268|269|290|291|297|298|299|350|351|352|353|354|355|356|357|358|359|370|371|372|373|374|375|376|377|378|379|380|381|382|383|385|386|387|389|420|421|423|500|501|502|503|504|505|506|507|508|509|590|591|592|593|594|595|596|597|598|599|670|672|673|674|675|676|677|678|679|680|681|682|683|685|686|687|688|689|690|691|692|850|852|853|855|856|872|880|886|960|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992|993|994|995|996|998)/,
};

export default (value) => {
  if (!value) return true;

  const cleanNumber = value.replace(/[\s\-\(\)]/g, "");

  if (!PHONE_REGEX.COUNTRY_CODES.test(cleanNumber)) {
    throw new ApiResponse.Error(
      400,
      "Mobile number must include a valid country code (e.g., +880, +1)"
    );
  }

  if (!PHONE_REGEX.INTERNATIONAL.test(cleanNumber)) {
    throw new ApiResponse.Error(400, "Invalid mobile number format");
  }

  const numberOnly = cleanNumber.replace(/\+/g, "");
  if (numberOnly.length < 8 || numberOnly.length > 15) {
    throw new ApiResponse.Error(
      400,
      "Mobile number must be between 8 and 15 digits"
    );
  }
  return true;
};
