import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { VacationReport } from '../types/Vacation';
import { fetchVacationReports, downloadReportsCsv } from '../services/vacationService';

export function Reports() {
  const [reportData, setReportData] = useState<VacationReport[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVacationReports()
      .then((data) => {
        const formatted = data.map((item) => ({
          destination: item.destination,
          likes_count: Number(item.likes_count) || 0,
        }));
        setReportData(formatted);
      })
      .catch((err: any) => setError(err.message || 'Failed to load reports'));
  }, []);

  const handleDownloadCsv = async () => {
    setError('');
    try {
      await downloadReportsCsv();
    } catch (err: any) {
      setError(err.message || 'Failed to export CSV');
    }
  };

  return (
    <div>
      <h1>Vacations Likes Report</h1>
      {error && <p>{error}</p>}

      {reportData.length > 0 && (
        <>
          <button onClick={handleDownloadCsv}>Export CSV</button>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={480}>
              <BarChart data={reportData} margin={{ top: 20, right: 30, left: 20, bottom: 90 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="destination"
                  interval={0}
                  angle={-40}
                  textAnchor="end"
                  height={110}
                />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={false} />
                <Bar dataKey="likes_count" name="Total Likes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}