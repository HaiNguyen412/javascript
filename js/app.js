
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
// function validatePhone(phone) {
//     return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone)
// }
function validatePhone(phone) {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone);
}

const btnSaveEl = document.querySelector('.save')
btnSaveEl.addEventListener('click', (e) => {
    e.preventDefault()
    validateForm()
    resetFormAction()
    
})

function validateForm() {
    let username = document.querySelector('#username').value
    let email = document.querySelector('#email').value
    let phone = document.querySelector('#phone').value
    let gender = ''
    if (document.querySelector("#male").checked) {
        gender = document.querySelector("#male").value
    } else if (document.querySelector("#female").checked) {
        gender = document.querySelector("#female").value
    }
    // Xứ lý nhập tên sinh viên
    if (_.isEmpty(username)) {
        document.querySelector('.username-err').innerHTML = "Vui lòng nhập họ và tên"
    } else if ((username.trim()).length <= 2) {
        document.querySelector('.username-err').innerHTML = "Nhập tên không được dưới 2 kí tự"
    } else if ((username.trim()).length >= 50) {
        document.querySelector('.username-err').innerHTML = "Nhập tên không được hơn 50 ký tự"
    } else {
        document.querySelector('.username-err').innerHTML = ""
    }

    // Xử lý Email
    if (_.isEmpty(email)) {
        document.querySelector('.email-err').innerHTML = "Vui lòng nhập email"
    } else if (!validateEmail(email)) {
        document.querySelector('.email-err').innerHTML = "Email nhập phải đúng định dạng"
    } else {
        document.querySelector('.email-err').innerHTML = ""
    }

    // Xử lý Số điện thoại
    if (_.isEmpty(phone)) {
        document.querySelector('.phone-err').innerHTML = "Vui lòng nhập số điện thoại"
    } else if ((phone).length < 10 || (phone).length > 10) {
        document.querySelector('.phone-err').innerHTML = "Số điện thoại không được lớn hoặc nhỏ hơn 10 ký tự"
        // } else if(!validatePhone(phone)) {
        //     document.querySelector('.phone-err').setCustomValidity("Không được nhập bằng kí tự")       
    } else {
        document.querySelector('.phone-err').innerHTML = ""
    }

    // Xử lý Giới tính
    if (_.isEmpty(gender)) {
        document.querySelector('.gender-err').innerHTML = "Vui lòng chọn giới tính của bạn!"
    } else {
        document.querySelector('.gender-err').innerHTML = ""
    }

    if (username && email && phone && gender) {
        //xu li them 
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        students.push({
            name: username,
            email: email,
            phone: phone,
            gender: gender
        });
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudents();
    }
}

function renderListStudents() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    if (students.length === 0) {
        // document.getElementById('container').style.display = 'none';
        return false
    } else {
        // document.getElementById('container').style.display = 'block';
        let tableContent = `<tr>
            <td>STT</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Gender</td>
            <td>Action</td>
        </tr>`;
        students.forEach((students, index) => {
            let idStudents = index;
            index++;
            let genderValue = parseInt(students.gender) === 1 ? 'Female' : 'Male';
            tableContent += `<tr>
            <td>${index}</td>
            <td>${students.name}</td>
            <td>${students.email}</td>
            <td>${students.phone}</td>
            <td>${genderValue}</td>
            <td >
                <button class="btn-edit">
                    <a href="UpdateStudents.html">Edit</a>
                </button>
                <button class="btn-delete"> 
                    <a onclick="deleteStudents(${idStudents})">Delete</a>
                </button>
            </td>
        </tr>`;
        });
        document.getElementById('table-content').innerHTML = tableContent;
    }
}
function deleteStudents(index) {
    let option = confirm('Ban co chac chan muon xoa?')
    if(option) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        students.splice(index, 1)
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudents();
    }else {
        return false;
    }
}

function Redirect() {
    window.location = "ListStudents.html";
 }

