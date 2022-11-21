const html_to_pdf = require('html-pdf-node');

const generatePDF = async (username, course) => {
  // console.log('html', html);
  const file = {
    url: `http://localhost:3000/certificate?username=${username}&course=${course}`,
  };

  const options = {
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  };

  try {
    const pdf = await html_to_pdf.generatePdf(file, options);
    console.log(pdf);
    return pdf;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generatePDF;
