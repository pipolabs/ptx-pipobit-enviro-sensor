enum TemperatureUnits {
    celsius = 0,
    fahrenheit = 1,
    kelvin = 2,
}

//% color="#228B22" icon="\uf0eb" weight=100
//% block="Environment Sensor"
//% block.loc.es-ES="Sensor Ambiental"
namespace pipobitEnviroSensor {

    let tempFiltrada = 0

    /**
     * Lee la temperatura desde el pin indicado, con opción de unidad y filtro.
     * Sensor: 500 mV + 10 mV × °C
     */
    //% block="Read temperature from pin $p || in $unit"
    //% block.loc.es-ES="Leer temperatura en pin $p || en $unit"
    //% unit.defl=TemperatureUnits.celsius unit.fieldEditor="gridpicker" unit.fieldOptions.width=220 unit.fieldOptions.columns=3
    //% p.fieldEditor="gridpicker" p.fieldOptions.width=220 p.fieldOptions.columns=3
    export function readTemperature(p: AnalogPin, unit: TemperatureUnits = TemperatureUnits.celsius): number {
        let lectura = pins.analogReadPin(p)
        let voltaje = lectura * 3.3 / 1023
        let temperatura = (voltaje - 0.5) / 0.01

        // Filtro exponencial: 0.1 = mucho suavizado, 0.5 = más reactivo
        tempFiltrada = 0.9 * tempFiltrada + 0.1 * temperatura

        let t = tempFiltrada
        if (unit == TemperatureUnits.fahrenheit) t = t * 9 / 5 + 32
        else if (unit == TemperatureUnits.kelvin) t = t + 273.15

        return Math.round(t * 10) / 10
    }

    /**
     * Lee el nivel de luz desde el pin indicado (0–100%) con filtro.
     */
    //% block="Read light from pin $p"
    //% block.loc.es-ES="Leer luz en pin $p"
    //% p.fieldEditor="gridpicker" p.fieldOptions.width=220 p.fieldOptions.columns=3
    export function readLight(p: AnalogPin): number {
        let lectura = pins.analogReadPin(p)
        let luz = Math.map(lectura, 10, 1000, 0, 100)
        luz = Math.constrain(luz, 0, 100)

        return Math.round(luz)
    }
}