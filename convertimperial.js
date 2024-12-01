// Unit conversion functions
function convertInchesToCm(inches) {
    return (inches * 2.54).toFixed(2) + ' cm';
  }
  
  function convertFeetToMeters(feet) {
    return (feet * 0.3048).toFixed(2) + ' m';
  }
  
  function convertMilesToKilometers(miles) {
    return (miles * 1.60934).toFixed(2) + ' km';
  }
  
  function convertPoundsToKilograms(pounds) {
    return (pounds * 0.453592).toFixed(2) + ' kg';
  }
  
  function convertFahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(2) + ' °C';
  }

  function convertMphToKph(mph) {
    return (mph * 1.60934).toFixed(2) + ' km/h';
  }
  
  
  // Regular expressions to find imperial units in the text
  const regexPatterns = [
    { regex: /\b(\d+(\.\d+)?)\s?inches?\b/g, convert: convertInchesToCm },
    { regex: /\b(\d+(\.\d+)?)\s?(?=")\b/g, convert: convertInchesToCm },
    { regex: /\b(\d+(\.\d+)?)\s?feet\b/g, convert: convertFeetToMeters },
    { regex: /\b(\d+(\.\d+)?)\s?ft\b/g, convert: convertFeetToMeters },
    { regex: /\b(\d+(\.\d+)?)\s?miles?\b/g, convert: convertMilesToKilometers },
    { regex: /\b(\d+(\.\d+)?)\s?lbs?\b/g, convert: convertPoundsToKilograms },
    { regex: /\b(\d+(\.\d+)?)\s?°F\b/g, convert: convertFahrenheitToCelsius }, 
    { regex: /\b(\d+(\.\d+)?)\s?mph\b/g, convert: convertMphToKph }
  ];
  
  // Function to replace text in a node
  function replaceTextContent(node) {
    let content = node.textContent;
  
    // Loop through each regex pattern and convert the values found
    regexPatterns.forEach(pattern => {
      content = content.replace(pattern.regex, (match, p1) => pattern.convert(parseFloat(p1)));
    });
  
    node.textContent = content;
  }
  
  // Function to traverse and modify text on the page
  function walkDOM(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      replaceTextContent(node);
    } else {
      node.childNodes.forEach(child => walkDOM(child));
    }
  }
  
  // Start traversing the DOM
  walkDOM(document.body);
  