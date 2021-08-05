const fs = require("fs");
const path = require("path");

const getPathName = (fileName) => path.resolve("mocks", fileName);

module.exports.saveMock = ({
  fileName,
  newData,
  action = "create" | "update",
}) => {
  const pathName = getPathName(fileName);

  fs.readFile(pathName, "utf-8", (err, data) => {
    if (err) throw err;

    let value = JSON.parse(data);

    switch (action) {
      case "create":
        value.push({ id: value[value.length - 1].id + 1, ...newData });
        break;
      case "update":
        value = value.map((element) => {
          if (element.id == newData.id) {
            element = { ...newData };
          }
          return element;
        });
        break;
      default:
        break;
    }

    fs.writeFile(
      pathName,
      JSON.stringify(value, null, 2),
      "utf-8",
      (err, data) => {
        if (err) throw err;
      }
    );
  });
};

// Tentar fazer com Promise

// const { promisify } = require("util");
// const readFilePromise = promisify(fs.readFile);
// const writeFilePromise = promisify(fs.writeFile);

// const getPathName = (fileName) => path.resolve("mocks", fileName);

// const bindAction = (action, oldData, data) => {
//   let value = oldData;

//   switch (action) {
//     case "create":
//       value.push({ id: value[value.length - 1].id + 1, ...data });
//       break;
//     case "update":
//       value = value.map((element) => {
//         if (element.id == data.id) {
//           element = { ...data };
//         }
//         return element;
//       });
//       break;
//     default:
//       break;
//   }

//   return value;
// };

// const saveMock = ({ fileName, newData, action = "create" | "update" }) => {
//   const pathName = getPathName(fileName);
//   let value;

//   return readFilePromise(pathName, "utf-8")
//     .then((err, data) => {
//       value = JSON.parse(data);
//       return JSON.parse(data);
//     })
//     .then(bindAction(action, value, newData))
//     .then(writeFilePromise(pathName, JSON.stringify(value, null, 2), "utf-8"));
// };
