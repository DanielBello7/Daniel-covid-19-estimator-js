


const covid19ImpactEstimator = (data) => {
    const input = data;
    
    var conversionFactor = "";

    if (data.periodType == "Days" || data.periodType == "Day"){
        var conversionFactor = 1;
    }
    if (data.periodType == "Weeks" || data.periodType == "Week"){
        var conversionFactor = 7;
    }
    if (data.periodType == "Months" || data.periodType == "Month"){
        var conversionFactor = 31;
    }

    var currentlyInfected = Number(data.reportedCases);

    var currentlyInfectedI = currentlyInfected * 10;
    var currentlyInfectedSI = currentlyInfected * 50;
    
    var days = data.timeToElapse * conversionFactor;
    var par = (days / 3);
    var power = Math.pow(2, par);

    var infectionsByRequestedTimeI = Number(currentlyInfectedI) * power;
    var infectionsByRequestedTimeSI = Number(currentlyInfectedSI) * power;
    
    var severeCasesByRequestedTimeI = (infectionsByRequestedTimeI * 15) / 100;
    var severeCasesByRequestedTimeSI = (infectionsByRequestedTimeSI * 15) / 100;

    var beds = (Number(data.totalHospitalBeds) * 35) / 100;
    var hospitalBedsByRequestedTimeI = beds - severeCasesByRequestedTimeI;
    var hospitalBedsByRequestedTimeSI = beds - severeCasesByRequestedTimeSI;

    var casesForICUByRequestedTimeI = (infectionsByRequestedTimeI * 5) / 100;
    var casesForICUByRequestedTimeSI = (infectionsByRequestedTimeSI * 5) / 100;

    var casesForVentilatorsByRequestedTimeI = (infectionsByRequestedTimeI * 2) / 100;
    var casesForVentilatorsByRequestedTimeSI = (infectionsByRequestedTimeSI * 2) / 100;

    var dollarsInFlightI = (infectionsByRequestedTimeI * 0.65) * 5 * 30;
    var dollarsInFlightSI = (infectionsByRequestedTimeSI * 0.65) * 5 * 30;

    return {
        data: input,
        impact: {
            currentlyInfectedI, 
            infectionsByRequestedTimeI,
            severeCasesByRequestedTimeI, 
            hospitalBedsByRequestedTimeI, 
            casesForICUByRequestedTimeI, 
            casesForVentilatorsByRequestedTimeI,
            dollarsInFlightI
        },
        severeImpact: {
            currentlyInfectedSI, 
            infectionsByRequestedTimeSI,
            severeCasesByRequestedTimeSI, 
            hospitalBedsByRequestedTimeSI, 
            casesForICUByRequestedTimeSI, 
            casesForVentilatorsByRequestedTimeSI,
            dollarsInFlightSI
        }
    }
}

export default covid19ImpactEstimator
