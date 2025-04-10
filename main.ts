enum TemperatureUnits {
    celsius = 0,
    fahrenheit = 1,
    kelvin = 2,
}

//% color="#228B22" icon="\uf0eb" weight=100 block="Enviroment sensor"
namespace pipobitEnviroSensor {

    //% block="Read temperature from pin $p || in $unit"
    //% block.loc.es-ES="Leer temperatura en pin $p || en $unit"
    //% unit.defl=TemperatureUnits.celsius unit.fieldEditor="gridpicker" unit.fieldOptions.width=220 unit.fieldOptions.columns=3
    //% p.fieldEditor="gridpicker" p.fieldOptions.width=220 p.fieldOptions.columns=3
    export function readTemperature(p: AnalogPin, unit: TemperatureUnits = TemperatureUnits.celsius): number {
        let kelvin = Math.map(pins.analogReadPin(p), 0, 1023, 0, 3.3) / 0.01;
        if (unit == TemperatureUnits.celsius) {
            return kelvin - 273.15;
        } else if (unit == TemperatureUnits.fahrenheit) {
            return (kelvin - 273.15) * 9 / 5 + 32;
        }
        return kelvin;
    }

    //% block="Read light from pin $p"
    //% block.loc.es-ES="Leer luz en pin $p"
    //% p.fieldEditor="gridpicker" p.fieldOptions.width=220 p.fieldOptions.columns=3
    export function readLight(p: AnalogPin): number {
        let level = Math.map(pins.analogReadPin(p), 10, 1000, 0, 100);
        return Math.constrain(level, 0, 100);
    }

}