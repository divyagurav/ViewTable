import ExamScheduleClassButtons from "../../../Buttons/ExamManagementButtons/ExamScheduleClassButton";
import { useEffect, useState } from "react";
export default function ExamScheduleClassWiseTable() {
  const [filteredExamDetails, setFilteredExamDetails] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const classOptions = [
    "LKG",
    "UKG",
    "Class - 1",
    "Class - 2",
    "Class - 3",
    "Class - 4",
    "Class - 5",
    "Class - 6",
    "Class - 7",
    "Class - 8",
    "Class - 9",
    "Class - 10",
  ];

  const data = [
    {
      dat: "08-04-2022",
      day: "Firday",
      hallNo: 2,
      class1: "6th",
      class2: "9th",
    },
    {
      dat: "10-04-2022",
      day: "Saturday",
      hallNo: 5,
      class1: "8th",
      class2: "10th",
    },
    {
      dat: "12-04-2022",
      day: "Tuesday",
      hallNo: 16,
      class1: "10th",
      class2: "8th",
    },
    {
      dat: "14-04-2022",
      day: "Wednesday",
      hallNo: 23,
      class1: "7th",
      class2: "5th",
    },
    {
      dat: "16-04-2022",
      day: "Thurday",
      hallNo: 32,
      class1: "9th",
      class2: "6th",
    },
    {
      dat: "18-04-2022",
      day: "Firday",
      hallNo: 6,
      class1: "2nd",
      class2: "4th",
    },
    // {
    //   dat: "19-04-2022",
    //   day: "Saturday",
    //   hallNo: 9,
    //   class1: "4th",
    //   class2: "th",
    // },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/examList`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        let map = new Map();
        const getTheData = (data, selectedClass, examType, timings) => {
          for (let key in data) {
            if (key === selectedClass) {
              if (
                map.has(data[key].date) &&
                map.get(data[key].date).subject === data[key].subject.name
              ) {
                if (examType === "Written") {
                  map.set(data[key].date, {
                    ...map.get(data[key].date),
                    writing: timings,
                  });
                } else {
                  map.set(data[key].date, {
                    ...map.get(data[key].date),
                    oral: timings,
                  });
                }
              } else {
                if (examType === "Written") {
                  map.set(data[key].date, {
                    date: data[key].date,
                    subject: data[key].subject.name,
                    writing: timings,
                    day: data[key].day,
                  });
                } else {
                  map.set(data[key].date, {
                    date: data[key].date,
                    subject: data[key].subject.name,
                    oral: timings,
                    day: data[key].day,
                  });
                }
              }
            }
          }
        };
        jsonData.forEach((detail) => {
          // Extract requiredCls and classes
          const { requiredCls, classes } = detail;

          // Check if selectedClass is either in requiredCls or classes
          const isSelectedClass =
            selectedClass === requiredCls || classes.includes(selectedClass);

          if (isSelectedClass) {
            for (let key in detail.scheduleData) {
              getTheData(
                detail.scheduleData[key],
                selectedClass,
                detail.examType,
                detail.timings
              );
            }
          }
        });
        // Convert the map to an array
        const resultArray = Array.from(map.values());
        //  sort the array
        resultArray.sort((a, b) => new Date(a.date) - new Date(b.date));
        setFilteredExamDetails(resultArray);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [selectedClass]);

  function ClassHead({ classTitle }) {
    return (
      <div className="flex flex-col gap-2 ">
        <div className="bg-customblue2 text-customblack rounded-lg shadow-tableRowShadow  w-full h-[44px] flex items-center justify-center">
          {classTitle}
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="bg-customblue2 text-customblack rounded-lg shadow-tableRowShadow w-[146px] h-[42px] flex items-center justify-center">
            A
          </div>
          <div className="bg-customblue2 text-customblack rounded-lg shadow-tableRowShadow w-[146px] h-[42px] flex items-center justify-center">
            B
          </div>
          <div className="bg-customblue2 text-customblack rounded-lg shadow-tableRowShadow w-[146px] h-[42px] flex items-center justify-center">
            C
          </div>
        </div>
      </div>
    );
  }
  function ExamSubject({ classItem, subject }) {
    return (
      <td className="flex flex-row items-center justify-between text-center p-3 w-[486px] gap-2">
        <div className="text-customblack rounded-lg w-[146px] flex items-center justify-center">
          subjectA
        </div>
        <div className="text-customblMathsack rounded-lg w-[146px] flex items-center justify-center">
          subjectB
        </div>
        <div className="text-customblMathsack rounded-lg w-[146px] flex items-center justify-center">
          subjectC
        </div>
      </td>
    );
  }

  const handleClassSelect = (classNo) => {
    setSelectedClass(classNo);
  };
  const handleExamSelect = (ExamType) => {
    setSelectedExamType(ExamType);
  };

  const handleSave = (ExamType) => {};
  return (
    <div className="flex flex-col gap-4 overflow-hidden ">
      <ExamScheduleClassButtons
        onClassSelect={handleClassSelect}
        onExamSelect={handleExamSelect}
        classWiseExamDetails={filteredExamDetails}
        handleSave={handleSave}
      />
      {/* overflow-x-scroll */}
      <div className="h-full border gap-6 px-4 rounded-custom1 max-h-[calc(100vh-140px)] overflow-y-hidden h-screen shadow-containerShadow">
        <div
          className="
          max-h-[calc(100vh-170px)] max-xl:max-h-[calc(100vh-200px)] px-1 scrollbarnone "
        >
          <div className="flex flex-row gap-10 h-full  ">
            <div className="shrink w-[550px] h-14 ">
              <table className="xl:w-full min-w-[1000px] border-spacing-6">
                <thead>
                  <tr className="flex flex-row items-center  gap-4 pb-1 m-1 overflow-x-scroll sticky top-0 pr-1 pl-1 pt-1">
                    <th className="flex items-center mt-1 justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden w-[110px] h-[45px]">
                      Date
                    </th>
                    <th className="flex items-center mt-1 shrink w-[457px] h-8 justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow  overflow-x-hidden ">
                      9.30AM to 12.30PM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex flex-row items-center gap-7 pb-1 overflow-x-scroll sticky top-0 pr-1 pl-1 pt-1 z-10">
                    <th className="flex items-center justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3  overflow-x-hidden w-[110px] h-[50px]">
                      Time
                    </th>
                    <th className="flex items-center   justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-4">
                      Hall No
                    </th>
                    <th className="flex items-center  justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-4">
                      Class 1
                    </th>
                    <th className="flex items-center   justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-4">
                      Class 2
                    </th>
                    <th className="flex items-center  justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2  overflow-x-hidden  w-[78px]  mr-4 ">
                      Total Students
                    </th>
                  </tr>
                  {data.map((dat) => (
                    <tr className="flex flex-row items-center gap-6 pb-1 mb-[6px] sticky top-0  pr-2 pl-1 pt-1">
                      <td className="flex items-center flex flex-col justify-center  bg-customblue2  p-1 text-customblack rounded-lg place-content-center text-center text-[14px] shadow-tableRowShadow p-2 overflow-x-hidden w-[120px] h-[50px]">
                        <div>{dat.dat}</div>
                        <div>{dat.day}</div>
                      </td>
                      <td className="flex items-center   justify-center text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-4">
                        {dat.hallNo}
                      </td>
                      <td className="flex items-center   justify-center  text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-4">
                        {dat.class1}
                      </td>
                      <td className="flex items-center   justify-center  text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-4">
                        {dat.class2}
                      </td>
                      <td className="flex items-center   justify-center  text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden  w-[80px]  mr-4">
                        20
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* grid grid-rows-2 grid-flow-col gap-4 grid-flow-col */}
            </div>
            <div className="  h-[518px] justify-center  ml-9 mt-2 mb-2 w-12 bg-customblue2 gap-8 rounded-lg  flex flex-col justify-center font-sans font-bold ">
              <span className=" rotate-90  text-2xl  p-4 tracking-[.28em] m-4 pt-6">
                Lunch
              </span>
              <span className=" rotate-90 text-2xl p-4 tracking-[.28em] m-4 pt-6">
                Break
              </span>
            </div>
            <div className="shrink w-64 h-14 p-1 ">
              <tabel className="xl:w-full min-w-[1000px] border-spacing-4">
                <thead>
                  <tr>
                    <th className="flex items-center  shrink w-[408px] h-7 justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow  overflow-x-hidden">
                      2.30PM to 4.30PM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex flex-row items-center gap-4 pb-1 overflow-x-scroll sticky top-0 pr-1 pl-1 pt-1 z-10">
                    <th className="flex items-center   justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3 overflow-x-hidden   w-[80px] mr-3 ">
                      Hall No
                    </th>
                    <th className="flex items-center  justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3 overflow-x-hidden   w-[80px] mr-3">
                      Class 1
                    </th>
                    <th className="flex items-center   justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3 overflow-x-hidden   w-[80px] mr-3">
                      Class 2
                    </th>
                    <th className="flex items-center  justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2  overflow-x-hidden  w-[78px]  mr-3">
                      Total Students
                    </th>
                  </tr>
                  {data.map((dat) => (
                    <tr className="flex flex-row items-center gap-4 pb-1 mb-[13px] sticky top-0 pr-2 pl-2 pt-2">
                      <td className="flex items-center   justify-center text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px]  mr-3 ">
                        {dat.hallNo}
                      </td>
                      <td className="flex items-center   justify-center  text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-3">
                        {dat.class1}
                      </td>
                      <td className="flex items-center   justify-center  text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden   w-[80px] mr-3 ">
                        {dat.class2}
                      </td>
                      <td className="flex items-center   justify-center  text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-2 overflow-x-hidden  w-[80px] mr-3 ">
                        20
                      </td>
                    </tr>
                  ))}
                </tbody>
              </tabel>
            </div>
          </div>

          {/* <table className=" xl:w-full min-w-[1000px] border-spacing-6 ">
            <thead> */}
          {/* <tr
                className={`flex flex-row items-center gap-4 pb-1 sticky top-0 pr-2 pl-2 pt-2`}
              >
                <th className="flex items-center justify-center bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3 overflow-x-hidden w-[146px] h-[96px]">
                  Date
                </th>
                <th className="flex items-center justify-center  bg-customblue2 text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3 overflow-x-hidden w-[146px] h-[96px]">
                  Time
                </th>
                {classOptions.map((classItem, idx) => {
                  return (
                    <th className="text-center p-3 w-[486px]" key={idx}>
                      <ClassHead classTitle={classItem} />
                    </th>
                  );
                })}
              </tr> */}

          {/* <tr className=" grid grid-cols-10 gap-5 pb-1 top-0 pr-2 pl-2 pt-2">
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden w-[100px]">
                  Time
                </th>
                <th className="col-span-4  bg-customblue2 text-customblack  rounded-lg place-content-center  p-2 shadow-tableRowShadow overflow-x-hidden">
                  9.30AM to 12.30PM
                </th>
                <th className="  bg-customblue2 rounded-lg place-content-center shadow-tableRowShadow overflow-x-hidden text-customblack row-span-9 row-span-9 w-[50px]">
                  Lunch Break
                </th>
                <th className="col-span-4  bg-customblue2 text-customblack  rounded-lg place-content-center  p-2  shadow-tableRowShadow">
                  2.30PM to 4.00PM
                </th>

                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-1  shadow-tableRowShadow overflow-x-hidden w-[100px] text-bold">
                  Date
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden w-[70px] ">
                  Hall No
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  Class 1
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  Class 2
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  Total Students
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  Hall No
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  Class 1
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  Class 2
                </th>
                <th className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  Total Students
                </th>

                <td className="text-customblack  bg-customblue2 rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden w-[100px] text-bold">
                  08-04-2022 Friday
                </td>
                <td className="text-customblack   rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden w-[70px] ">
                  2
                </td>
                <td className="text-customblack   rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  6th
                </td>
                <td className="text-customblack   rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  9th
                </td>
                <td className="text-customblack   rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  20
                </td>
                <td className="text-customblack   rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  3
                </td>
                <td className="text-customblack   rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  7th
                </td>
                <td className="text-customblack   rounded-lg place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  9th
                </td>
                <td className="text-customblack   rounded-lg  place-content-center text-customblack   p-2  shadow-tableRowShadow overflow-x-hidden  w-[70px]">
                  20
                </td>
              </tr>
            </thead>

            <tbody className="pr-2 pl-2 pb-1"> */}
          {/* {filteredExamDetails.map((exam, examIndex) => (
                <tr key={examIndex} className={`grid grid-cols-5 gap-4 pb-4`}>
                  <td className=" text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3">
                    {exam.date}
                  </td>
                  <td className=" text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3">
                    <div>{exam.day}</div>
                  </td>
                  <td className=" text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3">
                    {exam.writing ? exam.writing : "--"}
                  </td>
                  <td className=" text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3">
                    {exam.oral ? exam.oral : "--"}
                  </td>
                  <td className=" text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3">
                    {exam.subject}
                  </td>
                </tr>
              ))} */}

          {/* <tr className={`flex flex-row items-center gap-4 pb-4 px-2`}>
                <td className="flex items-center justify-center text-customblack rounded-lg place-content-center text-center shadow-tableRowShadow p-3 w-[146px] h-[71px]text-base">
                  08-04-2022 Friday
                </td>
                <td className="flex items-center justify-center text-customblack text-sm rounded-lg place-content-center text-center shadow-tableRowShadow p-2 w-[146px] h-[71px]">
                  10:00 AM - 11:30 AM
                </td>
                {classOptions.map((classItem, idx) => {
                  return <ExamSubject classItem={classItem} key={idx} />;
                })}
              </tr> */}
          {/* </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
