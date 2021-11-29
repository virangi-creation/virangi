export const updateWarpQuality = (yarnQualities) => {
    let warpQualityID = document.getElementById("warpQuality").value;
    for (let i = 0; i < yarnQualities.length; i++) {
        const yarnQuality = yarnQualities[i];
        if (yarnQuality.yarnquality === warpQualityID) {
            console.log(yarnQuality);
            document.getElementById("warpDenier").value =
                yarnQuality.yarndenier;
            document.getElementById("warpYarnPriceWOTPM").value =
                yarnQuality.totalprice.toFixed(2);
            document.getElementById("warpYarnGSTAmount").value =
                yarnQuality.gstamount.toFixed(2);
            console.log("Warp Quality Changed");
            updateRS();
            updateWarpYarnCost();
            break;
        }
    }
};

export const updateWeftQuality1 = (yarnQualities) => {
    let weftQualityID1 = document.getElementById("weftQuality1").value;
    for (let i = 0; i < yarnQualities.length; i++) {
        const yarnQuality = yarnQualities[i];
        if (yarnQuality.yarnquality === weftQualityID1) {
            document.getElementById("weftDenier1").value =
                yarnQuality.yarndenier;
            document.getElementById("weftYarnPriceWOTPM1").value =
                yarnQuality.totalprice.toFixed(2);
            document.getElementById("weftYarnGSTAmount1").value =
                yarnQuality.gstamount.toFixed(2);
            console.log("Weft 1 Quality Changed");
            updateWeftWeight1();
            updateWeftYarnCost1();
            break;
        }
    }
};

export const updateWeftQuality2 = (yarnQualities) => {
    let weftQualityID2 = document.getElementById("weftQuality2").value;
    for (let i = 0; i < yarnQualities.length; i++) {
        const yarnQuality = yarnQualities[i];
        if (yarnQuality.yarnquality === weftQualityID2) {
            document.getElementById("weftDenier2").value =
                yarnQuality.yarndenier;
            document.getElementById("weftYarnPriceWOTPM2").value =
                yarnQuality.totalprice.toFixed(2);
            document.getElementById("weftYarnGSTAmount2").value =
                yarnQuality.gstamount.toFixed(2);
            console.log("Weft 2 Quality Changed");
            updateWeftWeight2();
            updateWeftYarnCost2();
            break;
        }
    }
};

export const updateRS = () => {
    console.log("Update RS Called");
    var warpEnds = parseInt(document.getElementById("warpEnds").value);
    var reedCount = parseInt(document.getElementById("reedCount").value);
    var endsPerDen = parseInt(document.getElementById("endsPerDen").value);
    var selvedgeDen = parseInt(document.getElementById("selvedgeDen").value);
    var selvedgeEndsPerDen = parseInt(
        document.getElementById("selvedgeEndsPerDen").value
    );
    var RS =
        (2 * (warpEnds - selvedgeDen * 2 * (selvedgeEndsPerDen - endsPerDen))) /
        (reedCount * endsPerDen);
    document.getElementById("RS").value = RS.toFixed(2);
    updateWarpWeight();
    updateWeftWeight1();
    updateWeftWeight2();
};

export const updateWarpWeight = () => {
    console.log("Warp Weight Called");
    var warpLength = parseFloat(document.getElementById("warpLength").value);
    var warpDenier = parseFloat(document.getElementById("warpDenier").value);
    var warpEnds = parseFloat(document.getElementById("warpEnds").value);
    var warpWeight = parseFloat(
        (warpLength * warpDenier * warpEnds) / 9000000
    ).toFixed(3);
    document.getElementById("warpWeight").value = warpWeight;
    updateWarpWastage();
};

export const updateWarpWastage = () => {
    var warpWeight = parseFloat(document.getElementById("warpWeight").value);
    var warpWastage = parseFloat(document.getElementById("warpWastage").value);

    document.getElementById("totalWarpWeight").value = (
        warpWeight *
        (1 + warpWastage / 100)
    ).toFixed(3);
    updateWastage();
    updateCalculatedFabricWeight();
};

export const updateWeftWeight1 = () => {
    console.log("Weft Weight 1 Called");
    var RS = parseFloat(document.getElementById("RS").value);
    var PPI1 = parseFloat(document.getElementById("PPI1").value);
    var length1 = parseFloat(document.getElementById("length1").value);
    var weftDenier1 = parseFloat(document.getElementById("weftDenier1").value);
    var weftWeight1 = parseFloat(
        (RS * PPI1 * length1 * weftDenier1) / 9000000
    ).toFixed(3);
    document.getElementById("weftWeight1").value = weftWeight1;
    console.log(RS, PPI1, length1, weftDenier1);
    updateWeftWastage1();
};

export const updateWeftWastage1 = () => {
    var weftWeight1 = parseFloat(document.getElementById("weftWeight1").value);
    var warpWastage1 = parseFloat(
        document.getElementById("weftWastage1").value
    );

    document.getElementById("totalWeftWeight1").value = (
        weftWeight1 *
        (1 + warpWastage1 / 100)
    ).toFixed(3);
    updateWastage();
    updateCalculatedFabricWeight();
};

export const updateWarpTPM = () => {
    var warpYarnTPM = parseFloat(document.getElementById("warpYarnTPM").value);
    var warpYarnTPMRate = parseFloat(
        document.getElementById("warpYarnTPMRate").value
    );
    var warpYarnTPMCharge = (warpYarnTPM / 100) * warpYarnTPMRate;
    document.getElementById("warpYarnTPMCharge").value =
        warpYarnTPMCharge.toFixed(2);
    updateWarpYarnCost();
};

export const updateWeftTPM1 = () => {
    var weftYarnTPM1 = parseFloat(
        document.getElementById("weftYarnTPM1").value
    );
    var weftYarnTPMRate1 = parseFloat(
        document.getElementById("weftYarnTPMRate1").value
    );
    var weftYarnTPMCharge1 = (weftYarnTPM1 / 100) * weftYarnTPMRate1;
    document.getElementById("weftYarnTPMCharge1").value =
        weftYarnTPMCharge1.toFixed(2);
    updateWeftYarnCost1();
};

export const updateWeftTPM2 = () => {
    var weftYarnTPM2 = parseFloat(
        document.getElementById("weftYarnTPM2").value
    );
    var weftYarnTPMRate2 = parseFloat(
        document.getElementById("weftYarnTPMRate2").value
    );
    var weftYarnTPMCharge2 = (weftYarnTPM2 / 100) * weftYarnTPMRate2;
    document.getElementById("weftYarnTPMCharge2").value =
        weftYarnTPMCharge2.toFixed(2);
    updateWeftYarnCost2();
};

export const updateWeftWeight2 = () => {
    console.log("Weft Weight 2 Called");
    var RS = parseFloat(document.getElementById("RS").value);
    var PPI2 = parseFloat(document.getElementById("PPI2").value);
    var length2 = parseFloat(document.getElementById("length2").value);
    var weftDenier2 = parseFloat(document.getElementById("weftDenier2").value);
    var weftWeight2 = parseFloat(
        (RS * PPI2 * length2 * weftDenier2) / 9000000
    ).toFixed(3);
    document.getElementById("weftWeight2").value = weftWeight2;
    updateWeftWastage2();
};

export const updateWeftWastage2 = () => {
    var weftWeight2 = parseFloat(document.getElementById("weftWeight2").value);
    var warpWastage2 = parseFloat(
        document.getElementById("weftWastage2").value
    );
    document.getElementById("totalWeftWeight2").value = (
        weftWeight2 *
        (1 + warpWastage2 / 100)
    ).toFixed(3);
    updateWastage();
    updateCalculatedFabricWeight();
};

export const updateWeftYarnCost1 = () => {
    var tpmCharge = parseFloat(
        document.getElementById("weftYarnTPMCharge1").value
    );
    var yarnPriceWOTPM = parseFloat(
        document.getElementById("weftYarnPriceWOTPM1").value
    );
    document.getElementById("weftYarnPrice1").value = parseFloat(
        tpmCharge + yarnPriceWOTPM
    ).toFixed(2);
    updateYarnCost();
};

export const updateWeftYarnCost2 = () => {
    var tpmCharge2 = parseFloat(
        document.getElementById("weftYarnTPMCharge2").value
    );
    var yarnPriceWOTPM2 = parseFloat(
        document.getElementById("weftYarnPriceWOTPM2").value
    );
    document.getElementById("weftYarnPrice2").value = parseFloat(
        tpmCharge2 + yarnPriceWOTPM2
    );
    updateYarnCost();
};

export const updateCalculatedFabricWeight = () => {
    console.log("Total Weight Called");
    var weftWeight1 = parseFloat(document.getElementById("weftWeight1").value);
    var weftWeight2 = parseFloat(document.getElementById("weftWeight2").value);
    var warpWeight = parseFloat(document.getElementById("warpWeight").value);
    document.getElementById("dryWeight").value = (
        warpWeight +
        weftWeight1 +
        weftWeight2
    ).toFixed(3);

    var totalwarpWeight = parseFloat(
        document.getElementById("totalWarpWeight").value
    );
    var totalweftWeight1 = parseFloat(
        document.getElementById("totalWeftWeight1").value
    );
    var totalweftWeight2 = parseFloat(
        document.getElementById("totalWeftWeight2").value
    );
    document.getElementById("calWeight").value = (
        totalwarpWeight +
        totalweftWeight1 +
        totalweftWeight2
    ).toFixed(3);

    updateYarnCost();
    updateWastage();
};

export const updateWarpYarnCost = () => {
    var tpmCharge = parseFloat(
        document.getElementById("warpYarnTPMCharge").value
    );
    var yarnPriceWOTPM = parseFloat(
        document.getElementById("warpYarnPriceWOTPM").value
    );
    document.getElementById("warpYarnPrice").value = parseFloat(
        tpmCharge + yarnPriceWOTPM
    ).toFixed(2);
    updateYarnCost();
};

export const updateYarnCost = () => {
    console.log("Yarn Cost Called");
    var warpYarnPrice = parseFloat(
        document.getElementById("warpYarnPrice").value
    );
    var weftYarnPrice1 = parseFloat(
        document.getElementById("weftYarnPrice1").value
    );
    var weftYarnPrice2 = parseFloat(
        document.getElementById("weftYarnPrice2").value
    );

    var weftWeight1 = parseFloat(
        document.getElementById("totalWeftWeight1").value
    );
    var weftWeight2 = parseFloat(
        document.getElementById("totalWeftWeight2").value
    );
    var warpWeight = parseFloat(
        document.getElementById("totalWarpWeight").value
    );
    var warpYarnGSTAmount = parseFloat(
        document.getElementById("warpYarnGSTAmount").value
    );
    var weftYarnGSTAmount1 = parseFloat(
        document.getElementById("weftYarnGSTAmount1").value
    );
    var weftYarnGSTAmount2 = parseFloat(
        document.getElementById("weftYarnGSTAmount2").value
    );

    var qualityYarnCost = parseFloat(
        (parseFloat(weftWeight1 * weftYarnPrice1) +
            parseFloat(weftWeight2 * weftYarnPrice2) +
            parseFloat(warpWeight * warpYarnPrice)) /
            100
    );

    var totalGSTAmount = parseFloat(
        (parseFloat(weftWeight1 * weftYarnGSTAmount1) +
            parseFloat(weftWeight2 * weftYarnGSTAmount2) +
            parseFloat(warpWeight * warpYarnGSTAmount)) /
            100
    ).toFixed(2);

    document.getElementById("qualityYarnCost").value =
        qualityYarnCost.toFixed(2);

    document.getElementById("totalGSTAmount").value = totalGSTAmount;

    updateQualityCost();
    updateJobRates();
};

export const updateQualityCost = () => {
    console.log("Quality Cost Called");
    var jobCharge = parseFloat(document.getElementById("jobCharge").value);
    var PPI =
        parseFloat(document.getElementById("PPI1").value) +
        parseFloat(document.getElementById("PPI2").value);
    var qualityYarnCost = parseFloat(
        document.getElementById("qualityYarnCost").value
    );
    document.getElementById("qualityCost").value = parseFloat(
        qualityYarnCost + (PPI * jobCharge) / 100
    ).toFixed(2);
};

export const updateJobRates = () => {
    console.log("Job Rates Called");
    var qualityYarnCost = parseFloat(
        document.getElementById("qualityYarnCost").value
    );
    var marketPrice = parseFloat(document.getElementById("marketPrice").value);
    var PPI =
        parseFloat(document.getElementById("PPI1").value) +
        parseFloat(document.getElementById("PPI2").value);
    var totalGSTAmount = parseFloat(
        document.getElementById("totalGSTAmount").value
    );

    var j1 = (marketPrice - qualityYarnCost) / PPI;
    document.getElementById("j1").value = (j1 * 100).toFixed(2);

    var j2 = (marketPrice * 1.05 - qualityYarnCost) / PPI;
    document.getElementById("j2").value = (j2 * 100).toFixed(2);

    var j3 = (marketPrice - qualityYarnCost + totalGSTAmount) / PPI;
    document.getElementById("j3").value = (j3 * 100).toFixed(2);
};

export const updateTotalYarnPrice = () => {
    var yarnPrice = parseFloat(document.getElementById("yarnPrice").value);
    var gstPER = parseFloat(document.getElementById("gstPER").value);
    var cartage = parseFloat(document.getElementById("cartage").value);
    var gstAmount = parseFloat(((yarnPrice + cartage) * gstPER) / 100);
    var totalPrice = yarnPrice + gstAmount + cartage;
    document.getElementById("gstAmount").value = gstAmount.toFixed(2);
    document.getElementById("totalPrice").value = totalPrice.toFixed(2);
};

export const checkBoxClick = () => {
    let x, i, val;
    if (document.getElementById("weftYarn2").checked) {
        val = "table";
    } else {
        val = "none";
    }
    x = document.querySelectorAll(".hiddenInput");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = val;
    }
};

export const updateWastage = () => {
    const calWeight = parseFloat(document.getElementById("calWeight").value);
    const dryWeight = parseFloat(document.getElementById("dryWeight").value);
    let wastagegram = parseFloat(calWeight - dryWeight).toFixed(3);
    let wastageper = parseFloat((wastagegram / dryWeight) * 100).toFixed(2);
    document.getElementById("wastagegram").value = wastagegram;
    document.getElementById("wastageper").value = wastageper;
};

export const confirmButton = (str = "Do you want to continue ?") => {
    return window.confirm(str);
};

const exportsMaterial = {
    updateRS: updateRS,
    updateWeftTPM1: updateWeftTPM1,
    updateWarpTPM: updateWarpTPM,
    updateWarpWeight: updateWarpWeight,
    updateWeftWeight1: updateWeftWeight1,
    updateWeftTPM2: updateWeftTPM2,
    updateWeftWeight2: updateWeftWeight2,
    updateCalculatedFabricWeight: updateCalculatedFabricWeight,
    updateYarnCost: updateYarnCost,
    updateQualityCost: updateQualityCost,
    updateJobRates: updateJobRates,
    updateWarpQuality: updateWarpQuality,
    updateWeftQuality1: updateWeftQuality1,
    updateWeftQuality2: updateWeftQuality2,
    checkBoxClick: checkBoxClick,
    updateWastage: updateWastage,
    updateTotalYarnPrice: updateTotalYarnPrice,
    confirmButton: confirmButton,
    updateWarpWastage: updateWarpWastage,
    updateWeftWastage1: updateWeftWastage1,
    updateWeftWastage2: updateWeftWastage2,
};

export default exportsMaterial;
