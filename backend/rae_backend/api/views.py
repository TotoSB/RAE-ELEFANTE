from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from google import genai
from google.genai import types
from django.conf import settings

client = genai.Client()

# Create your views here.
@api_view(['POST'])
def sugerir_rae(request):
    data = request.data
    finalidad = data.get('finalidad')
    concepto = data.get('concepto')

    if not finalidad or not concepto:
        return Response({
            "error": "Se requieren los campos 'finalidad' y 'concepto' en el body."
        }, status=400)
    
    contexto_institucional = "Todos los Resultados de Aprendizaje Esperado en la universidad deben seguir la Taxonomía de Bloom y comenzar con un verbo en infinitivo de nivel superior (ej: Analizar, Evaluar, Crear). Deben ser centrados en el estudiante y evidenciables."

    prompt = f"Contexto institucional: {contexto_institucional} Finalidad de la RAE: {finalidad} Concepto a transformar en Resultado de Aprendizaje Esperado: {concepto}"

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=[
                "Actúa como un pedagogo experto especializado en diseño instruccional y neuroeducación.",
                "Debes generar un Resultado de Aprendizaje Esperado (RAE) claro, medible y observable",
                "Tu objetivo es transformar conceptos complejos en experiencias de aprendizaje accesibles, utilizando el andamiaje cognitivo y fomentando el pensamiento crítico.",
                "Prioriza siempre el aprendizaje activo y adapta tu lenguaje al nivel de comprensión del interlocutor."
                "Devolveme la respuesta en texto plano para leer en html (NO UTILIZAR MARKDOWN: ** , ##, etc.)",
                "No incluyas una repregunta al final, ya que el usuario no podrá responderla."
            ],
            thinking_config=types.ThinkingConfig(
            thinking_level="high",
        )
    )
    )
    return Response({
        "sugerencia_rae": response.text,
    })