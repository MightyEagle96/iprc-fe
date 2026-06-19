// import {   states } from "./pageData";
// import institutionsData from "./institutionData.json";

// export const institutions = institutionsData.sort((a, b) =>
//   a.INName.localeCompare(b.INName),
// );

// export const mappedInstitutions = institutions.map((d) => {
//   return {
//     ...d,
//     state: states[states.findIndex((c) => d.InSt === c.ST_ID)].ST_NAME || "",
//   };
// });

// export const institutionSummary = {
//   institutionsCount: institutionsData.length.toLocaleString(),
//   expectedParticipants: (institutionsData.length * 3).toLocaleString(),
// };

// export const academicRegistrationSummary = InstitutionType.map((c) => {
//   return {
//     name: c,
//     count: institutionsData.filter((d) => d.category === c).length,
//   };
// });
