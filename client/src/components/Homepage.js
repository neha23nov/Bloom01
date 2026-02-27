import React from 'react';
import { Link } from 'react-router-dom';

import { Calendar, Clock, TrendingUp, MapPin, Activity, Globe, AlertCircle, AlertTriangle, Info, Sprout, Users, Megaphone, Droplet, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Chatbot from "./Chatbot";

interface Props {
  companyName?: string;
}

const Homepage = (props: Props) => {


  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-200 via-blue-100 to-gray-300 px-6 py-24">
        <div className="absolute inset-0 opacity-30">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" alt="World Map" className="w-full h-full object-cover" />

        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Unlocking Nature's<br />Rhythms
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            BloomWatch provides real-time monitoring, AI-powered predictions, and conservation insights into global flowering events.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded font-medium hover:bg-green-700">
           <Link to="/phenology-trends"> Explore Data</Link>

            </button>
            {/* <button className="bg-white text-gray-900 px-6 py-3 rounded font-medium border border-gray-300 hover:bg-gray-50">
              Request a Demo
            </button> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Global Phenology Trends at a Glance
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Understand the macro-level shifts and patterns in flowering events driven by ecological factors.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">April 15th</h3>
              <p className="text-sm text-gray-600">Peak Bloom Date</p>
              <p className="text-xs text-gray-500 mt-2">Average start date across observed regions.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">22 Days</h3>
              <p className="text-sm text-gray-600">Average Bloom Duration</p>
              <p className="text-xs text-gray-500 mt-2">Typical length of peak flowering periods.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">+10%</h3>
              <p className="text-sm text-gray-600">Prediction Accuracy</p>
              <p className="text-xs text-gray-500 mt-2">Increase in bloom intensity with adequate rain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Detection Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            AI-Powered Bloom Detection
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Leveraging advanced artificial intelligence to accurately identify and track bloom events worldwide.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Bloom Detection Accuracy</h3>
              <div className="relative h-80">
                <div className="absolute inset-0 flex items-end justify-between gap-4 pb-8">
                  <div className="flex-1 bg-green-600 rounded-t" style={{ height: '85%' }}>
                    <div className="text-center text-white text-xs mt-2">Week 1</div>
                  </div>
                  <div className="flex-1 bg-green-600 rounded-t" style={{ height: '88%' }}>
                    <div className="text-center text-white text-xs mt-2">Week 2</div>
                  </div>
                  <div className="flex-1 bg-green-600 rounded-t" style={{ height: '92%' }}>
                    <div className="text-center text-white text-xs mt-2">Week 3</div>
                  </div>
                  <div className="flex-1 bg-green-600 rounded-t" style={{ height: '90%' }}>
                    <div className="text-center text-white text-xs mt-2">Week 4</div>
                  </div>
                  <div className="flex-1 bg-green-600 rounded-t" style={{ height: '93%' }}>
                    <div className="text-center text-white text-xs mt-2">Week 5</div>
                  </div>
                  <div className="flex-1 bg-green-600 rounded-t" style={{ height: '95%' }}>
                    <div className="text-center text-white text-xs mt-2">Week 6</div>
                  </div>
                </div>
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Real-time Identification</h4>
                  <p className="text-sm text-gray-600">
                    Our AI models instantly identify flowering events as they happen, ensuring immediate insights.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Phenological Anomaly Detection</h4>
                  <p className="text-sm text-gray-600">
                    Automatically flag unusual bloom patterns, helping detect impacts of climate change or environmental stress.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Global Coverage</h4>
                  <p className="text-sm text-gray-600">
                    Leveraging a vast network of data sources, we provide bloom detection insights across diverse ecosystems worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Predictive Risk Alerts
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Stay informed about potential environmental threats and anomalies affecting plant phenology.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-500">Critical</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Early Bloom Detected</h3>
              <p className="text-sm text-gray-600 mb-4">
                Significant bloom detected in temperate regions, 3 weeks ahead of historical average.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📅 Jan 28, 2024</span>
                <span>📍 Pacific Northwest</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600">Warning</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drought Impact Warning</h3>
              <p className="text-sm text-gray-600 mb-4">
                Reduced drought conditions in Southwest likely to shorten bloom duration for key native species.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📅 Mar 12, 2024</span>
                <span>📍 Southwest Arid</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-blue-500">Information</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pollinator Activity Low</h3>
              <p className="text-sm text-gray-600 mb-4">
                Reduced pollinator activity during peak bloom in a major agricultural area. Investigation recommended.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📅 Apr 05, 2024</span>
                <span>📍 Central Valley CA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Conservation & Actionable Recommendations
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Empowering individuals and organizations with insights to protect and preserve our planet's biodiversity.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Native Plant Initiatives</h3>
              <p className="text-sm text-gray-600 mb-6">
                Promote and plant native species that are resilient to local climate conditions and support local wildlife.
              </p>
              <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                Learn More
              </button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Volunteer for Local Conservancies</h3>
              <p className="text-sm text-gray-600 mb-6">
                Join efforts to monitor local ecosystems, report bloom changes, and participate in habitat restoration.
              </p>
              <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                Find Opportunities
              </button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Megaphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advocate for Climate Policy</h3>
              <p className="text-sm text-gray-600 mb-6">
                Support policies and initiatives that mitigate and protect biodiversity from climate change impacts.
              </p>
              <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                Get Involved
              </button>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reduce Water Usage</h3>
              <p className="text-sm text-gray-600 mb-6">
                Implement water-saving practices in gardens and landscapes to support plant health during dry periods.
              </p>
              <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                View Tips
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Company</a>
              <a href="#" className="hover:text-gray-900">Product</a>
              <a href="#" className="hover:text-gray-900">Resources</a>
              <a href="#" className="hover:text-gray-900">Legal</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            Team <span className="text-purple-600 font-semibold">err404</span>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>

  );
};

export default Homepage;