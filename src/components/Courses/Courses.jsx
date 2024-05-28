import { useEffect, useState } from 'react';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const coursesPerPage = 10;

    useEffect(() => {
        const url = "https://trial.lmsnext.com.br/moodle/webservice/rest/server.php";
        const token = "ff300151c2753d272aa0dde311f5c7db";
        const functionName = "core_course_get_courses";
        const moodleFormat = "json";

        const params = new URLSearchParams({
            wstoken: token,
            wsfunction: functionName,
            moodlewsrestformat: moodleFormat,
        });

        fetch(`${url}?${params.toString()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos:", data);
                if (data.courses) {
                    setCourses(data.courses);
                } else {
                    setCourses(data);
                }
            })
            .catch(error => setError(error.message));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredCourses = courses.filter(course =>
        course.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const displayedCourses = filteredCourses.slice(
        (currentPage - 1) * coursesPerPage,
        currentPage * coursesPerPage
    );

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="h-full bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Cursos</h1>
                <input
                    type="text"
                    placeholder="Pesquisar cursos..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <ul className="space-y-2 overflow-y-auto">
                    {displayedCourses.map(course => (
                        <li key={course.id} className="bg-gray-100 p-4 rounded hover:bg-gray-200 transition">
                            {course.fullname}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="text-gray-700">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Courses;
