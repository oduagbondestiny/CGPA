// Declaring all Public variables
const gradePoints = {
    'A': 5,
    'B': 4,
    'C': 3,
    'D': 2,
    'E': 1,
    'F': 0
  }; // Mapping for grade to points

const addCourse = document.querySelector('#addCourse'); // Mapping add course button from html
const showcaseTableBody = document.querySelector('#showcase tbody'); // Mapping html table to display all courses
const gpaOutput = document.querySelector('#gpaResult'); // Mapping id for displaying GPA points
let savedGPARecords = [];  
let courses = [] // Store Courses

// Function to clear all courses already added to table 
function clearCourse()
{
    courses = [];
    gpaOutput.innerHTML ='';
    displayCourses();

}

addCourse.addEventListener('click', ()=>{
   const courseCode = document.getElementById("courseCode").value;
   const getGrades = document.getElementById("grades").value;
   const getUnits = document.getElementById("units").value;



   if (courseCode && getGrades && getUnits) {
    const course = { courseCode, getGrades, getUnits};
    courses.push(course);

    // Update the table
    displayCourses();

    // Clear inputs
    courseCode = '';
    getGrades= ''; 
    getUnits = ''; 
  }

});

  // Function to display courses in the table
  function displayCourses()
  {
    showcaseTableBody.innerHTML = ''; // Clear previous entries

    courses.forEach((course, index) => {
      const row = document.createElement('tr');

      const courseCodeCell = document.createElement('td');
      courseCodeCell.textContent = course.courseCode;
      row.appendChild(courseCodeCell);

      const gradeCell = document.createElement('td');
      gradeCell.textContent = course.getGrades;
      row.appendChild(gradeCell);

      const unitsCell = document.createElement('td');
      unitsCell.textContent = course.getUnits;
      row.appendChild(unitsCell);

      // Remove button
      const removeCell = document.createElement('td');
      const removeButton = document.createElement('button');
      removeButton.className = "glyphicon glyphicon-remove-sign btn-danger";
      removeButton.onclick = () => removeCourse(index); // Set up the remove button
      removeCell.appendChild(removeButton);
      row.appendChild(removeCell);

      showcaseTableBody.appendChild(row);
    });
  }

   // Function to remove a course
   function removeCourse(index) {
    courses.splice(index, 1); // Remove the selected course
    displayCourses(); // Update the table
  }

   // Function to calculate GPA
   function calculateGPA()
    {
    let totalPoints = 0;
    let totalUnits = 0;

    courses.forEach(course => {
      const gradePoint = gradePoints[course.getGrades]; // Get the point equivalent of the grade
      const units = parseInt(course.getUnits); // Convert units to an integer

      totalPoints += gradePoint * units; // Multiply grade points by units and add to total points
      totalUnits += units; // Add the units
    });

    var gpa = totalPoints / totalUnits; // Calculate GPA

    // Display the GPA in the output element
    gpaOutput.textContent = `GPA: ${gpa.toFixed(2)}`;
    return gpa.toFixed(2);

    
  }


  // Function to save GPA with level and semester
function saveGPA()
{
  const level = document.getElementById('level').value;
  const semester = document.getElementById('semester').value;

  
  // Check if GPA has already been saved for this level and semester
  const existingRecord = savedGPARecords.find(record => record.level === level && record.semester === semester);

  if (existingRecord) {
    alert('GPA for this level and semester has already been saved. Please remove the previous one to save a new CGPA.');
    return;
  }

    // Get the calculated GPA from the current input
    const gpaResult = calculateGPA(); // this function calculates the GPA

    if (!gpaResult) {
      alert('Please calculate the GPA first.');
      return;
    }
        // Save the new CGPA record
    const newRecord = {
      level: level,
      semester: semester,
      gpa: gpaResult
    };
  
    savedGPARecords.push(newRecord);
    displaySavedGPA();
  
    alert(`GPA for ${level} Level, ${semester} Semester saved successfully!`);
  

}

function displaySavedGPA() {
  const savedRecordsTableBody = document.querySelector('#showcaseCGPA tbody');
  savedRecordsTableBody.innerHTML = ''; // Clear previous records

  savedGPARecords.forEach(record => {
    const row = document.createElement('tr');

    const levelCell = document.createElement('td');
    levelCell.textContent = record.level;
    row.appendChild(levelCell);

    const semesterCell = document.createElement('td');
    semesterCell.textContent = record.semester;
    row.appendChild(semesterCell);

    const cgpaCell = document.createElement('td');
    cgpaCell.textContent = record.gpa;
    row.appendChild(cgpaCell);

    // Remove button
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.className = "glyphicon glyphicon-remove-sign btn-danger";
    removeButton.onclick = () => removeGPA(record.level, record.semester); // Set up the remove button
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);


    savedRecordsTableBody.appendChild(row);
  });
}

function removeGPA(level, semester) {
  // Find the index of the GPA record to remove
  const recordIndex = savedGPARecords.findIndex(record => record.level === level && record.semester === semester);

  if (recordIndex === -1) {
    alert('No GPA record found for this level and semester.');
    return;
  }

  // Remove the GPA record from the array
  savedGPARecords.splice(recordIndex, 1);

  // Recalculate the total CGPA after removal
  calculateTotalCGPA();

  // Refresh the displayed GPA records
  displaySavedGPA();

  // Optionally, display a success message
  alert(`GPA for ${level} Level, ${semester} Semester removed successfully!`);
}


function calculateTotalCGPA() {
  // Check if there are any saved GPAs
  if (savedGPARecords.length === 0) {
    alert('No saved GPA records to calculate CGPA.');
    return;
  }

  // Sum up all the GPAs
  let totalGPA = 0;

  savedGPARecords.forEach(record => {
    totalGPA += parseFloat(record.gpa); // Convert gpa to a number and add to the total
  });

  // Calculate the average CGPA
  const totalCGPA = totalGPA / savedGPARecords.length;

  // Display the total CGPA
  const totalCGPAOutput = document.getElementById('totalCGPAResult');
  totalCGPAOutput.textContent = `Total CGPA: ${totalCGPA.toFixed(2)}`;
}



