/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    
    extend: {
      colors:{
        'gradbl1':'#005C97',
        'gradbl2':'#363795',
        'mainbg':' #060606',
        'secondbg':'#111111',
        'fieldbg':'#1D1D1D',
        'hoverbl':'#262626',
        'txtcol': '#303030',
        'cover-blue':'#4558B0',
        'purp':'#94128F',
        'cover-white':'#D9D9D9'
      }
      
    },
  },
  plugins: [],
};
