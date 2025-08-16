import React from 'react';
import { Users, CheckCircle, XCircle, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  statistics: {
    totalResumes: number;
    suitablePercentage: number;
    unsuitablePercentage: number;
    averageMatchScore: number;
    topSkillsLacking: Array<[string, number]>;
  };
}

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

type SkillsData = {
  skill: string;
  count: number;
  percentage: number;
};

const AnalyticsDashboard: React.FC<AnalyticsProps> = ({ statistics }) => {
  const cards = [
    {
      title: 'Total Resumes',
      value: statistics.totalResumes,
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      textColor: 'text-blue-700'
    },
    {
      title: 'Suitable',
      value: `${statistics.suitablePercentage}%`,
      icon: CheckCircle,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      textColor: 'text-green-700'
    },
    {
      title: 'Unsuitable',
      value: `${statistics.unsuitablePercentage}%`,
      icon: XCircle,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      textColor: 'text-red-700'
    },
    {
      title: 'Avg Match',
      value: `${statistics.averageMatchScore}%`,
      icon: Target,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      textColor: 'text-purple-700'
    }
  ];

  const pieData = [
    { name: 'Suitable', value: statistics.suitablePercentage, color: '#10B981' },
    { name: 'Unsuitable', value: statistics.unsuitablePercentage, color: '#EF4444' }
  ];

  const skillsData = statistics.topSkillsLacking.map(([skill, count]) => ({
    skill,
    count,
    percentage: Math.round((count / statistics.totalResumes) * 100)
  }));

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl mr-4">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div key={index} className={`${card.bgColor} p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-opacity-20`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-4 rounded-xl shadow-lg`}>
                <card.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{card.title}</p>
                <p className={`text-4xl font-bold ${card.textColor} mt-1`}>{card.value}</p>
              </div>
            </div>
            <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${card.color.replace('bg-gradient-to-r', 'bg-gradient-to-r')} transition-all duration-1000`}
                style={{ width: `${typeof card.value === 'string' ? parseInt(card.value) : Math.min(card.value * 10, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Suitability Distribution Chart */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg mr-3">
              <Target className="h-5 w-5 text-white" />
            </div>
            Candidate Suitability Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                  data={pieData as PieChartData[]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry: PieChartData, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
                </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Gap Analysis */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-lg mr-3">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            Top Skills Gap Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                data={skillsData as SkillsData[]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="skill" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number, name: string) => [value, name === 'count' ? 'Missing Count' : 'Percentage']}
                  labelFormatter={(label: string) => `Skill: ${label}`}
                />
                <Bar dataKey="count" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Skills Breakdown List */}
      <div className="mt-8 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Skills Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statistics.topSkillsLacking.map(([skill, count], index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <span className="text-gray-900 font-semibold">{skill}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Missing in</div>
                  <div className="font-bold text-gray-900">{count} candidates</div>
                </div>
                <div className="bg-gradient-to-r from-red-100 to-orange-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold">
                  {Math.round((count / statistics.totalResumes) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;