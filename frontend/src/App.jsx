import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [finalidadCurso, setFinalidadCurso] = useState('');
  const [conceptoTema, setConceptoTema] = useState('');
  const [step, setStep] = useState(1);
  const [sugerenciaRAEApi, setSugerenciaRAEApi] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleFinalidadChange = (event) => {
    setFinalidadCurso(event.target.value);
  }

  const handleConceptoTemaChange = (event) => {
    setConceptoTema(event.target.value);
  }

  const handleNext = () => {
    if (finalidadCurso.trim() !== '') {
      setStep(2);
    } else {
      alert("Por favor, completa la finalidad del curso.");
    }
  }

  const handleBack = () => {
    setStep(1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando:", { finalidadCurso, conceptoTema });
    alert("Formulario enviado (mira la consola)");
  }

  const fetchRAESuggestion = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/sugerir-rae/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          finalidad: finalidadCurso,
          concepto: conceptoTema,
        }),
      });

      const data = await response.json();

      setSugerenciaRAEApi(
        data.sugerencia_rae || "No se recibió una sugerencia de la RAE."
      );

      setShowModal(true);

    } catch (error) {
      console.error("Error al obtener sugerencia de la RAE:", error);
      alert("Hubo un error al obtener la sugerencia de la RAE.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return (
    <>
      <header>
        <span>Desarrollado por <a href="https://www.linkedin.com/in/tomas-bianchi/" target='_blank'><b>Tomás Serafin Bianchi</b></a> </span>
      </header>
      <main>
        <form onSubmit={handleSubmit}>

          <div className={`slider-container step-${step}`}>

            <section className='onboarding_section'>
              <h2 className='title_sections'>Finalidad del curso</h2>
              <label htmlFor="contenido">
                Ingrese la finalidad del curso:
              </label>
              <textarea
                name="contenido"
                id="contenido"
                required
                value={finalidadCurso}
                onChange={handleFinalidadChange}
                placeholder='Ejemplo: Este curso introduce a los estudiantes en los fundamentos de la programacion orientada a objetos'
              />
              <button type="button" onClick={handleNext}>Siguiente</button>
            </section>

            <section className='onboarding_section'>
              <h2 className='title_sections'>Tema Principal</h2>
              <label htmlFor="concepto_tema">
                Ingrese el Concepto o tema principal:
              </label>
              <input
                type="text"
                name="concepto_tema"
                id="concepto_tema"
                required
                value={conceptoTema}
                onChange={handleConceptoTemaChange}
                placeholder='Ejemplo: Herencia y polimorfismo'
              />
              <div className="button-group">
                <button type="button" className="secondary" onClick={handleBack}>Atrás</button>
                <button type="button" onClick={fetchRAESuggestion} disabled={loading}>
                  {loading ? "Generando..." : "Sugerir RAE"}
                </button>
              </div>
            </section>


          </div>
        </form>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-3d" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <h2>RAE Generado</h2>
                <p>{sugerenciaRAEApi}</p>
                <button onClick={() => setShowModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default App