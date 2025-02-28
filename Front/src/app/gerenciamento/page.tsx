"use client"

import { useState, useEffect, useContext } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AuthContext } from "../context"

const chartConfig = {
  precokWhE: {
    label: "Conta com Mudança de hábito",
    color: "hsl(199, 89%, 89%)",
  },
  precokWhN: {
    label: "Conta Normal",
    color: "hsl(252, 95%, 85%)",
  },
  precokWhR: {
    label: "Conta com Energia Limpa",
    color: "hsl(120, 95%, 85%)",
  },
} satisfies ChartConfig

interface EconomiaData {
  economiaE: number
  economiaR: number
}

export default function Gerenciamento() {
  const { user } = useContext(AuthContext)
  const [chartData, setChartData] = useState([])
  const [economia, setEconomia] = useState<EconomiaData[]>([])
  const [totalSavings, setTotalSavings] = useState({ habit: 0, clean: 0 })
  const [consumptionTrend, setConsumptionTrend] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/gerenciamento/getLista/${user?.email}/2`)
      const data = await response.json()

      const transformedData = data.map((item: { month: string; precokWhE: number; precokWhN: number; precokWhR: number }) => ({
        month: item.month,
        precokWhE: Number(item.precokWhE.toFixed(2)),
        precokWhN: Number(item.precokWhN.toFixed(2)),
        precokWhR: Number(item.precokWhR.toFixed(2)),
      }))

      const economiaData = data.map((item: { economiaE: number; economiaR: number }) => ({
        economiaE: Number(item.economiaE.toFixed(2)),
        economiaR: Number(item.economiaR.toFixed(2)),
      }))

      setEconomia(economiaData)
      setChartData(transformedData)

      // Calculate total savings
      const totalHabitSavings = economiaData.reduce((sum: number, item: { economiaE: number }) => sum + item.economiaE, 0)
      const totalCleanSavings = economiaData.reduce((sum: number, item: { economiaR: number }) => sum + item.economiaR, 0)
      setTotalSavings({ habit: Number(totalHabitSavings.toFixed(2)), clean: Number(totalCleanSavings.toFixed(2)) })

      // Calculate consumption trend
      const lastTwoMonths = transformedData.slice(-2)
      if (lastTwoMonths.length === 2) {
        const trend = ((lastTwoMonths[1].precokWhN - lastTwoMonths[0].precokWhN) / lastTwoMonths[0].precokWhN) * 100
        setConsumptionTrend(Number(trend.toFixed(2)))
      }
    }

    fetchData()
  }, [user?.email])

  const ultimaEconomia = economia.length > 0 ? economia[economia.length - 1] : null

  return (
    <main className="flex items-center flex-col bg-gray-100 p-3">
      <div className="bg-white rounded-md p-5 text-center m-3 w-10/12">
        <h1 className="text-xl md:text-2xl mx-auto pb-3">Resumo de Gerenciamento de Energia</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Economia Total</p>
            <p className="text-2xl font-bold text-green-600">
              R$ {(totalSavings.habit + totalSavings.clean).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Tendência de Consumo</p>
            <p className={`text-2xl font-bold ${consumptionTrend < 0 ? "text-green-600" : "text-red-600"}`}>
              {consumptionTrend}%
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Economia Verde</p>
            <p className="text-2xl font-bold text-green-600">R$ {totalSavings.clean.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Card className="w-3/4">
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="precokWhN"
                    type="linear"
                    stroke="var(--color-precokWhN)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="precokWhE"
                    type="linear"
                    stroke="var(--color-precokWhE)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    dataKey="precokWhR"
                    type="linear"
                    stroke="var(--color-precokWhR)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-10/12">
        <div className="bg-white rounded-md p-3 text-center shadow">
          <h1 className="text-xl md:text-2xl mx-auto pb-3">Projeção com mudança de hábitos</h1>
          <Card>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="precokWhN" fill="var(--color-precokWhN)" radius={4} />
                  <Bar dataKey="precokWhE" fill="var(--color-precokWhE)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {ultimaEconomia && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Economia Estimada para o Próximo Mês:</p>
              <p className="text-2xl font-bold text-green-600">R$ {ultimaEconomia.economiaE.toFixed(2)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">75% de chance de atingir esta economia</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-md p-3 text-center shadow">
          <h1 className="text-xl md:text-2xl mx-auto pb-3">Projeção com Energia Limpa</h1>
          <Card>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="precokWhN" fill="var(--color-precokWhN)" radius={4} />
                  <Bar dataKey="precokWhR" fill="var(--color-precokWhR)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          {ultimaEconomia && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Economia Estimada para o Próximo Mês:</p>
              <p className="text-2xl font-bold text-green-600">R$ {ultimaEconomia.economiaR.toFixed(2)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">90% de chance de atingir esta economia</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-md p-5 text-center m-3 w-10/12 mt-6">
        <h2 className="text-xl md:text-2xl mx-auto pb-3">Recomendações Personalizadas</h2>
        <ul className="list-disc pl-6 text-left space-y-2">
          <li>Substitua lâmpadas antigas por LEDs para economizar até 15% em iluminação.</li>
          <li>Configure termostatos inteligentes para otimizar o uso do ar condicionado.</li>
          <li>Considere instalar painéis solares para reduzir sua dependência da rede elétrica.</li>
          <li>Desligue aparelhos eletrônicos quando não estiverem em uso para evitar consumo em standby.</li>
        </ul>
      </div>
    </main>
  )
}