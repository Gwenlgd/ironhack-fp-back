import { format, parseISO } from 'date-fns';

function formatDate(dateString) {
  const date = parseISO(dateString);
  return format(date, 'eeee dd MMMM yyyy');
}

// function groupInputsByDate(inputs) {
//   const grouped = {};

//   inputs.forEach(input => {
//     const dateKey = formatDate(input.date)

//     if (!grouped[dateKey]) {
//       grouped[dateKey] = {
//         ingredients: [],
//         moods: [],
//         symptoms: []
//       };
//     }

//     input.ingredient.forEach(item => {
//       if (!grouped[dateKey].ingredients.includes(item.toString())) {
//         grouped[dateKey].ingredients.push(item.toString());
//       }
//     });

//     input.mood.forEach(item => {
//       if (!grouped[dateKey].moods.includes(item.toString())) {
//         grouped[dateKey].moods.push(item.toString());
//       }
//     });

//     input.symptom.forEach(item => {
//       if (!grouped[dateKey].symptoms.includes(item.toString())) {
//         grouped[dateKey].symptoms.push(item.toString());
//       }
//     });

//   })
//   return grouped;
// }

module.exports = { formatDate, groupInputsByDate };
