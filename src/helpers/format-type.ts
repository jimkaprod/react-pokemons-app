const formatType = (type: number): string => {
  let color: string;

  switch (type) {
    case 1:
      color = 'red lighten-1';
      break;
    case 2:
      color = 'blue lighten-1';
      break;
    case 3:
      color = 'green lighten-1';
      break;
    case 4:
      color = 'brown lighten-1';
      break;
    case 5:
      color = 'grey lighten-3';
      break;
    case 6:
      color = 'blue lighten-3';
      break;
    case 7:
      color = 'deep-purple accent-1';
      break;
    case 8:
      color = 'pink lighten-4';
      break;
    case 9:
      color = 'deep-purple darken-2';
      break;
    case 10:
      color = 'lime accent-1';
      break;
    case 11:
      color = 'deep-orange';
      break;
    default:
      color = 'grey';
      break;
  }

  return `chip ${color}`;
}

export default formatType;
