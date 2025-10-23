import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Lock, Zap, AlertTriangle, MapPin, Clock, Battery } from 'lucide-react';

const GeneratorFleetMonitor = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [generators, setGenerators] = useState([
    {
      id: 1,
      name: "Tampa Bay Medical Center",
      address: "2450 Oak Ridge Blvd",
      status: "healthy",
      healthScore: 92,
      runtimeToday: 18.5,
      temperature: 185,
      vibration: 2.3,
      acCurrent: 45,
      batteryVoltage: 12.8,
      doorStatus: "closed",
      activeAlerts: 0,
      lastUpdate: "4m ago",
      nextCheck: "~5m",
      model: "Generac 24kW"
    },
    {
      id: 2,
      name: "Riverside Commerce Plaza",
      address: "890 River Road",
      status: "warning",
      healthScore: 74,
      runtimeToday: 22.3,
      temperature: 205,
      vibration: 4.1,
      acCurrent: 62,
      batteryVoltage: 12.2,
      doorStatus: "closed",
      activeAlerts: 1,
      lastUpdate: "2m ago",
      nextCheck: "~7m",
      model: "Generac 36kW"
    },
    {
      id: 3,
      name: "Industrial Park Distribution",
      address: "4521 Commerce Drive",
      status: "critical",
      healthScore: 45,
      runtimeToday: 28.7,
      temperature: 218,
      vibration: 5.8,
      acCurrent: 71,
      batteryVoltage: 11.6,
      doorStatus: "closed",
      activeAlerts: 2,
      lastUpdate: "Just now",
      nextCheck: "~9m",
      model: "Generac 48kW"
    },
    {
      id: 4,
      name: "Maple Avenue Residence",
      address: "1205 Maple Avenue",
      status: "healthy",
      healthScore: 88,
      runtimeToday: 12.2,
      temperature: 178,
      vibration: 1.9,
      acCurrent: 38,
      batteryVoltage: 13.1,
      doorStatus: "closed",
      activeAlerts: 0,
      lastUpdate: "6m ago",
      nextCheck: "~4m",
      model: "Generac 22kW"
    },
    {
      id: 5,
      name: "Downtown Data Center",
      address: "755 Central Avenue",
      status: "healthy",
      healthScore: 95,
      runtimeToday: 15.8,
      temperature: 182,
      vibration: 2.1,
      acCurrent: 52,
      batteryVoltage: 12.9,
      doorStatus: "closed",
      activeAlerts: 0,
      lastUpdate: "3m ago",
      nextCheck: "~6m",
      model: "Generac 60kW"
    },
    {
      id: 6,
      name: "Westside Facility",
      address: "3388 West Boulevard",
      status: "offline",
      healthScore: 0,
      runtimeToday: 0,
      temperature: 0,
      vibration: 0,
      acCurrent: 0,
      batteryVoltage: 0,
      doorStatus: "unknown",
      activeAlerts: 1,
      lastUpdate: "45m ago",
      nextCheck: "N/A",
      model: "Generac 30kW"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time updates for non-offline generators
      setGenerators(prev => prev.map(gen => {
        if (gen.status === 'offline') return gen;
        
        const tempChange = (Math.random() - 0.5) * 3;
        const vibChange = (Math.random() - 0.5) * 0.3;
        const currentChange = (Math.random() - 0.5) * 4;
        const batteryChange = (Math.random() - 0.5) * 0.1;
        
        const newTemp = Math.max(165, Math.min(220, gen.temperature + tempChange));
        const newVib = Math.max(0.5, Math.min(7, gen.vibration + vibChange));
        const newCurrent = Math.max(30, Math.min(75, gen.acCurrent + currentChange));
        const newBattery = Math.max(11.0, Math.min(13.5, gen.batteryVoltage + batteryChange));
        
        // Calculate health score based on parameters
        let healthScore = 100;
        if (newTemp > 200) healthScore -= (newTemp - 200) * 2;
        if (newVib > 4) healthScore -= (newVib - 4) * 8;
        if (newCurrent > 65) healthScore -= (newCurrent - 65) * 1.5;
        if (newBattery < 12.4) healthScore -= (12.4 - newBattery) * 15;
        if (newBattery < 12.0) healthScore -= 20; // Critical battery penalty
        healthScore = Math.max(0, Math.min(100, Math.round(healthScore)));
        
        // Determine status
        let status = 'healthy';
        let activeAlerts = 0;
        if (healthScore < 50) {
          status = 'critical';
          activeAlerts = 2;
        } else if (healthScore < 80) {
          status = 'warning';
          activeAlerts = 1;
        }
        
        return {
          ...gen,
          temperature: newTemp,
          vibration: newVib,
          acCurrent: newCurrent,
          batteryVoltage: newBattery,
          healthScore,
          status,
          activeAlerts
        };
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'healthy': return 'text-green-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'healthy': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusDot = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'healthy': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">All Generators</h1>
            <span className="px-2 py-1 bg-yellow-500 bg-opacity-20 text-yellow-500 text-xs font-semibold rounded">
              Demo
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Generator Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {generators.map(gen => (
          <div 
            key={gen.id}
            className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{gen.name}</h3>
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(gen.status)}`}></div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <MapPin className="w-3 h-3" />
                  <span>{gen.address}</span>
                </div>
              </div>
              <span className={`px-2 py-1 ${getStatusBg(gen.status)} text-white text-xs font-semibold rounded`}>
                {gen.status}
              </span>
            </div>

            {/* Main Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Health Score</div>
                <div className={`text-3xl font-bold ${getStatusColor(gen.status)}`}>
                  {gen.healthScore}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Runtime Today</div>
                <div className="text-3xl font-bold">
                  {gen.runtimeToday}h
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Battery Health</div>
                <div className="flex items-center gap-1">
                  <Battery className={`w-6 h-6 ${
                    gen.batteryVoltage < 12.0 ? 'text-red-400' : 
                    gen.batteryVoltage < 12.4 ? 'text-yellow-400' : 
                    'text-green-400'
                  }`} />
                  <div className={`text-2xl font-bold ${
                    gen.batteryVoltage < 12.0 ? 'text-red-400' : 
                    gen.batteryVoltage < 12.4 ? 'text-yellow-400' : 
                    'text-green-400'
                  }`}>
                    {gen.batteryVoltage.toFixed(1)}V
                  </div>
                </div>
                <div className={`text-xs mt-1 font-semibold ${
                  gen.batteryVoltage < 12.0 ? 'text-red-400' : 
                  gen.batteryVoltage < 12.4 ? 'text-yellow-400' : 
                  'text-green-400'
                }`}>
                  {gen.batteryVoltage < 12.0 ? 'CRITICAL' : 
                   gen.batteryVoltage < 12.4 ? 'AGING' : 
                   'GOOD'}
                </div>
              </div>
            </div>

            {/* Sensor Readings */}
            <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
              <div>
                <div className="text-gray-400 text-xs mb-1">Battery</div>
                <div className={`font-semibold flex items-center gap-1 ${
                  gen.batteryVoltage < 12.0 ? 'text-red-400' : 
                  gen.batteryVoltage < 12.4 ? 'text-yellow-400' : 
                  'text-green-400'
                }`}>
                  <Battery className="w-3 h-3" />
                  {gen.batteryVoltage.toFixed(1)}V
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Temp</div>
                <div className="font-semibold flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-orange-400" />
                  {gen.temperature}°F
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Vibration</div>
                <div className="font-semibold flex items-center gap-1">
                  <Activity className="w-3 h-3 text-purple-400" />
                  {gen.vibration.toFixed(1)}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1">Current</div>
                <div className="font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  {gen.acCurrent}A
                </div>
              </div>
            </div>

            {/* Alerts */}
            {gen.activeAlerts > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className={`w-4 h-4 ${gen.status === 'critical' ? 'text-red-500' : 'text-yellow-500'}`} />
                  <span className={gen.status === 'critical' ? 'text-red-500' : 'text-yellow-500'}>
                    {gen.activeAlerts} active alert{gen.activeAlerts > 1 ? 's' : ''}
                  </span>
                </div>
                {gen.status === 'critical' && (
                  <div className="mt-2 p-2 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded text-xs text-red-400">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span className="font-semibold">CRITICAL</span>
                    </div>
                    <div>Engine overheating - Temperature at {gen.temperature}°F</div>
                  </div>
                )}
                {gen.status === 'warning' && (
                  <div className="mt-2 p-2 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded text-xs text-yellow-400">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      <span className="font-semibold">WARNING</span>
                    </div>
                    <div>Elevated temperature - Monitor cooling system</div>
                  </div>
                )}
                {gen.status === 'offline' && (
                  <div className="mt-2 p-2 bg-gray-500 bg-opacity-10 border border-gray-500 border-opacity-30 rounded text-xs text-gray-400">
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                      <span className="font-semibold">OFFLINE</span>
                    </div>
                    <div>No data received - Check connectivity</div>
                  </div>
                )}
              </div>
            )}

            {gen.activeAlerts === 0 && gen.status !== 'offline' && (
              <div className="mb-4">
                <div className="flex items-center gap-2 p-2 bg-green-500 bg-opacity-10 rounded text-xs">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(gen.status)} animate-pulse`}></div>
                  <span className="text-green-400 font-semibold">HEALTHY</span>
                  <Clock className="w-3 h-3 text-green-400 ml-auto" />
                  <span className="text-gray-400">{gen.lastUpdate} • Next: {gen.nextCheck}</span>
                </div>
              </div>
            )}

            {/* Footer Info */}
            <div className="pt-3 border-t border-gray-800 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <div>
                  <Clock className="w-3 h-3 inline mr-1" />
                  Sensor cycle: 10min • UI refresh: 60sec
                </div>
              </div>
              <div className="mt-1">
                Model: {gen.model}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-black px-6 py-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
          <div>
            Powered by HydroScan × Monnit IoT Platform | GenerX Generators Fleet Monitoring
          </div>
          <div>
            {generators.filter(g => g.status === 'healthy').length} Healthy • 
            {generators.filter(g => g.status === 'warning').length} Warning • 
            {generators.filter(g => g.status === 'critical').length} Critical • 
            {generators.filter(g => g.status === 'offline').length} Offline
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorFleetMonitor;